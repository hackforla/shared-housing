from functools import wraps

import os
from os import environ as env
import json
from flask import (
    Flask, 
    render_template, 
    request, 
    Response, 
    make_response,
    redirect,
    jsonify,
    session,
    url_for
)
import psycopg2
import pymongo
from urllib.parse import quote_plus
import pprint
from authlib.flask.client import OAuth
from six.moves.urllib.parse import urlencode
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv

DEBUG = False
if DEBUG:
    DB_HOST = 'localhost'
    DB_PORT = '8080'
else:
    DB_HOST = os.environ['SHAREDHOUSING_MONGO_SERVICE_HOST']
    DB_PORT = os.environ['SHAREDHOUSING_MONGO_SERVICE_PORT']
    MONGO_USERNAME = os.environ['MONGO_USERNAME']
    MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
    MONGO_DATABASE = os.environ['MONGO_DATABASE']
            
app = Flask(__name__)


oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id='KWjQUqHNbo2RniEUs9MfAK2JSwn3bMiZ',
    client_secret='W2WDDJ1mpeltbKxbB7Y82c9XDfuosFyjxzHXGv7lta-o52Y5mN_aOZwFuK4s94iL',
    api_base_url='https://dev-w3xfkh4k.auth0.com',
    access_token_url='https://dev-w3xfkh4k.auth0.com/oauth/token',
    authorize_url='https://dev-w3xfkh4k.auth0.com/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)


def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    if 'profile' not in session:
      # Redirect to Login page here
      return redirect('/')
    return f(*args, **kwargs)

  return decorated

@app.route('/auth0cb')
def callback_handling():
    # Handles response from token endpoint
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    return redirect('/dashboard')


@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri='http://ivan-alpha.xyz/auth0cb')

@app.route("/mongo")
def test_mongo():

    print('/mongo -- about to connect...')

    try:           

        url = 'mongodb://{}:{}@{}:{}'.format(
            quote_plus(MONGO_USERNAME),
            quote_plus(MONGO_PASSWORD),
            DB_HOST,
            DB_PORT
        )

        print('url: {}'.format(url))

        client = pymongo.MongoClient(url)
        db = client[MONGO_DATABASE]

        data = {
            'test'  : 'worked'
        }
        
        js = json.dumps(data)    
        resp = Response(js, status=200, mimetype='application/json')
        return resp

    except Exception as e:
        data = {
            'test'  : 'failed',

            'error': str(e)
        }
        
        js = json.dumps(data)    
        resp = Response(js, status=500, mimetype='application/json')
        return resp


# @app.route("/postgres", methods=['POST'])
# def test_postgres():
#     body = request.json
#     conn = psycopg2.connect("host={} dbname=sharedhousingdb user=sharedhousing password=shadmin0".format(DB_HOST))
#     conn.set_session(autocommit=True)
#     cur = conn.cursor()
#     cur.callproc('insertClient', ('tyler', 'thome', 'tyler.thome@outlook.com', '05-15-1906', 'male', 'klingon'))
#     cur.close()
#     conn.commit()
#     conn.close()
    
#     data = {
#         'hello'  : 'world',
#         'number' : 3
#     }
    
#     js = json.dumps(data)    
#     resp = Response(js, status=200, mimetype='application/json')
#     return resp

@app.route('/api/questions', methods=['GET', 'POST'])
def questions():

    try:
        if request.method == 'POST':

            body = request.json

            record = {
                'set_id': 0,
                'question_id': body['id'],
                'text': body['text']
            }        

            url = 'mongodb://{}:{}@{}:{}'.format(
                quote_plus(MONGO_USERNAME),
                quote_plus(MONGO_PASSWORD),
                DB_HOST,
                DB_PORT
            )

            client = pymongo.MongoClient(url)

            db = client[MONGO_DATABASE]

            collection = db.questionSets


            result = collection.insert_one(record).inserted_id

            data = {
                'result': str(result),
                'record': str(record)
            }


        if request.method == 'GET':

            url = 'mongodb://{}:{}@{}:{}'.format(
                quote_plus(MONGO_USERNAME),
                quote_plus(MONGO_PASSWORD),
                DB_HOST,
                DB_PORT
            )

            client = pymongo.MongoClient(url)
            db = client[MONGO_DATABASE]
            collection = db.questionSets

            result = collection.find()

            records = list()

            for r in result:
                records.append(str(r))

            data = {
                'result': records
            }

        
        js = json.dumps(data)    
        resp = Response(js, status=200, mimetype='application/json')
        return resp
    
    except Exception as e:
        data = {
            'test'  : 'failed',

            'error': str(e)
        }
        
        js = json.dumps(data)    
        resp = Response(js, status=500, mimetype='application/json')
        return resp

@app.route('/logout')
def logout():
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': 'KWjQUqHNbo2RniEUs9MfAK2JSwn3bMiZ'}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))

@app.route("/dashboard")
@requires_auth
def dashboard():
    return render_template('dashboard.html',
                           userinfo=session['profile'],
                           userinfo_pretty=json.dumps(session['jwt_payload'], indent=4))

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
    
