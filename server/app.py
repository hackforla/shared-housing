from functools import wraps
import logging
import os
from os import environ as env
from bson import ObjectId
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
    url_for,
    send_from_directory
)
# import psycopg2
import pymongo
from urllib.parse import quote_plus
import pprint
from authlib.flask.client import OAuth
from six.moves.urllib.parse import urlencode
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv

LOCAL_HOST = True


DEBUG = True
if DEBUG:
    DB_HOST = 'localhost'
    DB_PORT = 27017
    MONGO_DATABASE = 'sharedhousing'
else:
    DB_HOST = os.environ['SHAREDHOUSING_MONGO_SERVICE_HOST']
    DB_PORT = os.environ['SHAREDHOUSING_MONGO_SERVICE_PORT']
    MONGO_USERNAME = os.environ['MONGO_USERNAME']
    MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
    MONGO_DATABASE = os.environ['MONGO_DATABASE']
            
app = Flask(__name__)

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)

app.secret_key = '{}'.format(os.urandom(16))

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

class Repository:

    def __init__(self):
        
        self.url = 'mongodb://{}:{}'.format(
            DB_HOST,
            DB_PORT
        )

    def _get_conn(self):
        client = pymongo.MongoClient(self.url)
        try:
            # The ismaster command is cheap and does not require auth.
            client.admin.command('ismaster')
            return client
        except ConnectionFailure:
            print("Server not available")
            return None

    def get_candidates(self):
        
        self._log('get_candidates', 'acquiring connection...')

        client = self._get_conn()

        if not client:
            raise Exception('Mongo server not available')
        
        self._log('get_candidates', 'selecting database..')
        db = client[MONGO_DATABASE]

        self._log('get_candidates', 'selecting collection...')
        collection = db.candidates

        self._log('get_candidates', 'querying...')
        cursor = collection.find()

        self._log('get_candidates', 'mongo finished, populating result list...')
        candidates = list(cursor)

        for c in candidates:
            c['_id'] = str(c['_id'])

        self._log('get_candidates', 'candidates = {}'.format(candidates))
        return candidates

    def add_candidate(self, candidate):
        client = self._get_conn()

        if not client:
            raise Exception('Mongo server not available')

        db = client[MONGO_DATABASE]
        collection = db.candidates

        result = collection.insert_one(candidate).inserted_id

        return result

    def delete_candidate(self, candidate_id):
        client = self._get_conn()

        if not client:
            raise Exception('Mongo server not available')

        db = client[MONGO_DATABASE]
        collection = db.candidates

        result = collection.delete_one({'_id':ObjectId(candidate_id)})
        self._log('delete_candidate', 'result.raw_result = {}'.format(result.raw_result))

        return result

    def update_candidate(self, candidate_id, candidate):
        client = self._get_conn()

        if not client:
            raise Exception('Mongo server not available')

        db = client[MONGO_DATABASE]
        collection = db.candidates

        result = collection.update_one({'_id':ObjectId(candidate_id)}, {'$set': candidate })

        self._log('update_candidate', 'result.raw_result = {}'.format(result.raw_result))

        return result

    def _log(self, method_name, message):
        print('Repository:{}: {}'.format(method_name, message))


repository = Repository()


@app.route('/api/candidates', methods=['GET', 'POST'])
def candidates():

    print('candidates:{}'.format(request.method))
    print('- request.json = {}'.format(json.dumps(request.json)))

    if request.method == 'POST':

        try:

            mongo_id = repository.add_candidate(request.json)
            resp = Response(str(mongo_id), status=200)
            return resp

        except Exception as e:
            err = 'Error: {}'.format(e)
            print(err)
            response = Response(err, status=500)
            return response

    elif request.method == 'GET':

        try:
            candidates = repository.get_candidates()
            response = jsonify(candidates)
            response.status_code = 200
            return response

        except Exception as e:
            err = 'Error: {}'.format(e)
            print(err)
            response = Response(err, status=500)
            return Response

    else:
        response = Response('Unsupported HTTP method: {}'.format(request.method))
        return response


@app.route('/api/candidates/<candidate_id>', methods=['PUT', 'DELETE'])
def candidates_by_id(candidate_id):

    print('candidates:{}'.format(request.method))
    print('- request.json = {}'.format(json.dumps(request.json)))

    if request.method == 'PUT':

        try:

            result = repository.update_candidate(candidate_id, request.json)
            
            response = Response('OK', status=200)
            return response

        except Exception as e:
            err = 'Error: {}'.format(e)
            print(err)
            response = Response(err, status=500)
            return response

    elif request.method == 'DELETE':

        try:
            result = repository.delete_candidate(candidate_id)
            response = Response('OK', status=200)
            return response

        except Exception as e:
            err = 'Error: {}'.format(e)
            print(err)
            response = Response(err, status=500)
            return response

    else:
        response = Response('Unsupported HTTP method: {}'.format(request.method))
        return response



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
    app.logger.info('/auth0cb: start')

    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    app.logger.info('userinfo:\n{}'.format(json.dumps(userinfo, indent=4)))

    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    app.logger.info('/auth0cb: end')
    return redirect('/dashboard')


@app.route('/login')
def login():
    app.logger.info('/login')
    return auth0.authorize_redirect(redirect_uri='http://ivan-alpha.xyz/auth0cb')

@app.route("/mongo")
def test_mongo():

    print('/mongo -- about to connect...')

    try:           

        # url = 'mongodb://{}:{}@{}:{}'.format(
        #     quote_plus(MONGO_USERNAME),
        #     quote_plus(MONGO_PASSWORD),
        #     DB_HOST,
        #     DB_PORT
        # )

        url = 'mongodb://{}:{}'.format(
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

            # url = 'mongodb://{}:{}@{}:{}'.format(
            #     quote_plus(MONGO_USERNAME),
            #     quote_plus(MONGO_PASSWORD),
            #     DB_HOST,
            #     DB_PORT
            # )
            url = 'mongodb://{}:{}'.format(
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

            url = 'mongodb://{}:{}'.format(
                DB_HOST,
                DB_PORT
            )
            
            # url = 'mongodb://{}:{}@{}:{}'.format(
            #     quote_plus(MONGO_USERNAME),
            #     quote_plus(MONGO_PASSWORD),
            #     DB_HOST,
            #     DB_PORT
            # )

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
    app.logger.info('/logout')
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('index', _external=True), 'client_id': 'KWjQUqHNbo2RniEUs9MfAK2JSwn3bMiZ'}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))

@app.route("/dashboard")
@requires_auth
def dashboard():
    app.logger.info('/dashboard')
    return render_template('dashboard.html',
                           userinfo=session['profile'],
                           userinfo_pretty=json.dumps(session['jwt_payload'], indent=4))

@app.route("/")
def index():
    app.logger.info('/index')
    return render_template("index.html")

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        app.root_path, 
        'favicon.ico', 
        mimetype='image/vnd.microsoft.icon'
    )

if __name__ == "__main__":
    if LOCAL_HOST:
        print('running on 8765...')
        app.run(host="0.0.0.0", port=8765)
    else:
        app.run(host="0.0.0.0", port=80)

    
