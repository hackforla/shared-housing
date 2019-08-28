import os
import json
from flask import Flask, render_template, request, Response
import psycopg2

DB_HOST = os.environ['SHARED_HOUSING_DB_SVC_SERVICE_HOST']
DB_PORT = os.environ['SHARED_HOUSING_DB_SVC_SERVICE_PORT']

application = Flask(__name__)

@application.route("/add", methods=['POST'])
def add_client():
    body = request.json
    print('got request: {}'.format(body))
    
    data = {
        'hello'  : 'world',
        'number' : 3
    }
    
    js = json.dumps(data)    
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@application.route("/insert", methods=['POST'])
def insert_client():
    body = request.json
    print('got request: {}. connecting to DB...'.format(body))
    conn = psycopg2.connect("host={} dbname=sharedhousingdb user=sharedhousing password=shadmin0".format(DB_HOST))
    print('connected! creating cursor...')
    conn.set_session(autocommit=True)
    cur = conn.cursor()

    
    # p_firstname varchar, 
    # p_lastname varchar, 
    # p_email varchar, 
    # p_birthdate date, 
    # p_gender varchar, 
    # p_ethnicity varchar
    print('cursor created. calling proc...')
    cur.callproc('insertClient', ('tyler', 'thome', 'tyler.thome@outlook.com', '05-15-1906', 'male', 'klingon'))
    cur.close()
    conn.commit()
    conn.close()
    print('complete!')
    data = {
        'hello'  : 'world',
        'number' : 3
    }
    
    js = json.dumps(data)    
    resp = Response(js, status=200, mimetype='application/json')
    return resp




@application.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)
    