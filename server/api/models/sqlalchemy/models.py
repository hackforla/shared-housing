""" Database models file. 
Insert all tables, models, and schemas for the Database here."""
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class QuestionResponse(db.Model):
    questionId = db.Column(db.Integer, primary_key=True)
    responseValue = db.Column(db.String(100))
    candidateId = db.Column(db.Integer)

    def __init__(self, responseValue, candidateId):
        self.responseValue = responseValue
        self.candidateId = candidateId

class ResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionid', 'responseValue', 'candidateId')

class Candidate(db.Model):
    candidateId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

class CandidateSchema(ma.Schema):
    class Meta:
        fields = ('candidateId', 'name')

class Location(db.Model):
    locationId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

class LocationSchema(ma.Schema):
    class Meta:
        fields = ('locationId', 'name')