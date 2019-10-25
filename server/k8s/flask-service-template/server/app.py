import os
import json
from flask import Flask, render_template, request, Response, make_response
import psycopg2
import pymongo
from urllib.parse import quote_plus
import pprint

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
            
application = Flask(__name__)

@application.route("/mongo")
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


@application.route("/postgres", methods=['POST'])
def test_postgres():
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

@application.route('/api/questions', methods=['GET', 'POST'])
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


@application.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)
    
