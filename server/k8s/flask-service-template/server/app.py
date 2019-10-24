import os
import json
from flask import Flask, render_template, request, Response
import psycopg2
import pymongo
from urllib.parse import quote_plus
import pprint

DEBUG = False
if DEBUG:
    DB_HOST = 'localhost'
    DB_PORT = '8080'
else:
    DB_HOST = os.environ['SHARED_HOUSING_APP_SERVICE_HOST']
    DB_PORT = int(os.environ['SHARED_HOUSING_APP_SERVICE_PORT'])
    MONGO_USERNAME = os.environ['MONGO_USERNAME']
    MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
    MONGO_DATABASE = os.environ['MONGO_DATABASE']
            
application = Flask(__name__)


@application.route("/mongo")
def test_mongo():
    pprint.pprint('/mongo -- about to connect...')
    # client = pymongo.MongoClient(DB_HOST, DB_PORT)
    client = pymongo.MongoClient('mongodb://{}:{}@{}:{}'.format(
        quote_plus(MONGO_USERNAME),
        quote_plus(MONGO_PASSWORD),
        DB_HOST,
        DB_PORT
    ))
    db = client[MONGO_DATABASE]
    collections = db.list_collection_names()
    pprint.pprint('collections = {}'.format(collections))
    question_sets = db['questionSets']
    pprint.pprint('questionSets = {}'.format(question_sets.find_one()))


@application.route("/insert", methods=['POST'])
def insert_client():
    body = request.json
    conn = psycopg2.connect("host={} dbname=sharedhousingdb user=sharedhousing password=shadmin0".format(DB_HOST))
    conn.set_session(autocommit=True)
    cur = conn.cursor()
    cur.callproc('insertClient', ('tyler', 'thome', 'tyler.thome@outlook.com', '05-15-1906', 'male', 'klingon'))
    cur.close()
    conn.commit()
    conn.close()
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
    
