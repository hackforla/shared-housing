import os
import json
from flask import Flask, render_template, request, Response
import psycopg2

from centrality.recommend import Node


# dbname=sharedhousingdb 
# ser=sharedhousing 
# password=shadmin0
DB_NAME = 'sharedhousingdb'
DB_USER = 'sharedhousing'
DB_PW = 'shadmin0'

DEBUG = False
if DEBUG:
    DB_HOST = 'localhost'
    DB_PORT = '8080'
else:
    DB_HOST = os.environ['SHARED_HOUSING_DB_SVC_SERVICE_HOST']
    DB_PORT = os.environ['SHARED_HOUSING_DB_SVC_SERVICE_PORT']



class DbClient:

    def __init__(host, port, user, password):
        self.conn = None
        self.host = host
        self.port = port
        self.user = user
        self.password = password


    def open_connection(self):

        self.conn = psycopg2.connect(
            "host={host} dbname={dbname} user={user} password={password}".format(
                host=self.host,
                dbname=self.dbname,
                user=self.user,
                password=self.password,
            )
        )

        self.conn.set_session(autocommit=True)

    def do_procedure(self):
        cur = self.conn.cursor()
        self.conn.commit()


    def close_connection(self):
        self.conn.close()


application = Flask(__name__)


@application.route("/data", methods=['GET'])
def get_data():
    body = request.json

    print('body: {}'.format(body))

    js = json.dumps(body)    
    resp = Response(js, status=200, mimetype='application/json')
    return resp




if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)
    