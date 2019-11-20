""" Database models file.
Insert all tables, models, and schemas for the Database here."""
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, Integer, String, Float

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
        fields = ('questionId', 'responseValue', 'candidateId')


class Candidate(db.Model):
    candidateId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class CandidateSchema(ma.Schema):
    class Meta:
        fields = ('candidateId', 'name')


class HousingLocation(db.Model):
    __tablename__ = 'locations'
    locationId = db.Column(db.Integer, primary_key=True)
    location_id = Column(Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    housing_type_id = Column(Integer)
    beds_available = Column(Integer)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class LocationSchema(ma.Schema):
    class Meta:
        fields = ('location_id', 'name', 'latitude', 'longitude', 'housing_type_id', 'beds_available')
