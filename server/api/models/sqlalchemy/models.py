""" Database models file.
Insert all tables, models, and schemas for the Database here."""
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, Integer, String, Float, text

db = SQLAlchemy()
ma = Marshmallow()


class QuestionResponse(db.Model):
    questionId = db.Column(db.Integer, db.ForeignKey("question.questionId"), primary_key=True)
    # question = db.relationship("Question")
    responseValue = db.Column(db.String(100))
    candidateId = db.Column(db.Integer, db.ForeignKey("candidate.candidateId"), primary_key=True)
    # candidate = db.relationship("Candidate")

    def __init__(self, response_value, candidate_id, question_id):
        self.responseValue = response_value
        self.candidateId = candidate_id
        self.questionId = question_id


class QuestionResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionId', 'responseValue', 'candidateId')


class LocationResponse(db.Model):
    questionId = db.Column(db.Integer, db.ForeignKey("question.questionId"), primary_key=True)
    # question = db.relationship("Question")
    responseValue = db.Column(db.String(100))
    locationId = db.Column(db.Integer, db.ForeignKey("location.locationId"), primary_key=True)
    # location = db.relationship("HousingLocation")


class QuestionResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionId', 'responseValue', 'locationId')


class Candidate(db.Model):
    candidateId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class CandidateSchema(ma.Schema):
    class Meta:
        fields = ('candidateId', 'name')


class Question(db.Model):
    questionId = db.Column(db.Integer, primary_key=True)
    questionText = db.Column(db.String(100))

    def __init__(self, question_text):
        self.questionText = question_text


class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('questionText', 'questionId')


class Form(db.Model):
    formId = db.Column(db.Integer, primary_key=True)
    formName = db.Column(db.String(100))
    formDescription = db.Column(db.String(100))

    def __init__(self, form_name, form_description):
        self.formName = form_name
        self.formDescription = form_description


class FormSchema(ma.Schema):
    class Meta:
        fields = ('formId', 'formName', 'formDescription')


class FormQuestion(db.Model):
    formId = db.Column(db.Integer, db.ForeignKey("form.formId"), primary_key=True)
    questionId = db.Column(db.Integer, db.ForeignKey("question.questionId"), primary_key=True)

    def __init__(self, form_id, question_id):
        self.formId = form_id
        self.questionId = question_id


class FormQuestionSchema(ma.Schema):
    class Meta:
        fields = ('formId', 'questionId')


class HousingLocation(db.Model):
    __tablename__ = 'location'
    locationId = db.Column(db.Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    housingTypeId = Column(Integer)
    bedsAvailable = Column(Integer)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class LocationSchema(ma.Schema):
    class Meta:
        fields = ('locationId', 'name', 'latitude', 'longitude', 'housingTypeId', 'bedsAvailable')
