"""Configuration file used for apis"""
import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    SQLALCHEMY_DATABASE_URI = 'postgres://postgres:sharedhousing@localhost:5432/sharedhousing'
