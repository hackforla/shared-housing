""" Database models file.
Insert all tables, models, and schemas for the Database here."""
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, Integer, String, Float, text

db = SQLAlchemy()
ma = Marshmallow()



###########################################################
###################### CORE ###############################
###########################################################


class Candidate(db.Model):
    candidateId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class CandidateSchema(ma.Schema):
    class Meta:
        fields = ('candidateId', 'name')


class HousingLocation(db.Model):
    __tablename__ = 'location'
    locationId = db.Column(db.Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    housingTypeId = Column(Integer)
    bedsAvailable = Column(Integer)
    name = db.Column(db.String(100))

    def __init__(self, latitude, longitude, housing_type_id, beds_available, name):
        self.latitude = latitude
        self.longitude = longitude
        self.housingTypeId = housing_type_id
        self.bedsAvailable = beds_available
        self.name = name

class LocationSchema(ma.Schema):
    class Meta:
        fields = ('locationId', 'name', 'latitude', 'longitude', 'housingTypeId', 'bedsAvailable')





###########################################################
################ V1: Combined Question ####################
###########################################################



class QuestionResponse(db.Model):
    questionId = db.Column(db.Integer, db.ForeignKey("question.questionId"), primary_key=True)
    responseValue = db.Column(db.String(100))
    candidateId = db.Column(db.Integer, db.ForeignKey("candidate.candidateId"), primary_key=True)

    def __init__(self, response_value, candidate_id, question_id):
        self.responseValue = response_value
        self.candidateId = candidate_id
        self.questionId = question_id


class QuestionResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionId', 'responseValue', 'candidateId')


class LocationResponse(db.Model):
    questionId = db.Column(db.Integer, db.ForeignKey("question.questionId"), primary_key=True)
    responseValue = db.Column(db.String(100))
    locationId = db.Column(db.Integer, db.ForeignKey("location.locationId"), primary_key=True)

    def __init__(self, response_value, location_id, question_id):
        self.responseValue = response_value
        self.locationId = location_id
        self.questionId = question_id


class LocationResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionId', 'responseValue', 'locationId')


class Question(db.Model):
    questionId = db.Column(db.Integer, primary_key=True)
    candidateQuestion = db.Column(db.String(100))
    locationQuestion = db.Column(db.String(100))
    isConstraint = db.Column(db.Boolean)
    inverseRelationship = db.Column(db.Boolean)

    def __init__(self, candidate_question, location_question, is_constraint, inverse_relationship):
        self.candidateQuestion = candidate_question
        self.locationQuestion = location_question
        self.isConstraint = is_constraint
        self.inverseRelationship = inverse_relationship




class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('candidateQuestion', 'locationQuestion', 'questionId', 'isConstraint', 'inverseRelationship')


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




###########################################################
################# V2: Separate Questions ##################
###########################################################



###########################################################
#################### LOCATION #############################
###########################################################

class LocationQuestion(db.Model):
    __tablename__ = 'locationQuestion'
    locationQuestionId = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100))    
    # candidateId = db.Column(db.Integer, db.ForeignKey("candidate.candidateId"), primary_key=True)

    def __init__(self, text):
        self.text = text

class LocationQuestionSchema(ma.Schema):
    class Meta:
        fields = ('locationQuestionId', 'text')

class LocationResponseValue(db.Model):
    __tablename__ = 'locationResponseValue'
    locationResponseValueId = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100))    
    locationQuestionId = db.Column(db.Integer, db.ForeignKey("locationQuestion.locationQuestionId"))

    def __init__(self, text, location_question_id):
        self.text = text
        self.locationQuestionId = location_question_id

class LocationResponseValueSchema(ma.Schema):
    class Meta:
        fields = ('locationResponseValueId', 'text', 'locationQuestionId')

class HousingLocationResponse(db.Model):
    locationQuestionId = db.Column(db.Integer, db.ForeignKey("locationQuestion.locationQuestionId"), primary_key=True)
    locationResponseValueId = db.Column(db.Integer, db.ForeignKey("locationResponseValue.locationResponseValueId"), primary_key=True)
    locationId = db.Column(db.Integer, db.ForeignKey("location.locationId"), primary_key=True)

    def __init__(self, location_response_value_id, location_id, location_question_id):
        self.locationQuestionId = location_question_id
        self.locationId = location_id
        self.locationResponseValueId = location_response_value_id


class HousingLocationResponseSchema(ma.Schema):
    class Meta:
        fields = ('questionId', 'locationId', 'locationResponseValueId')




###########################################################
#################### CANDIDATE ############################
###########################################################
class CandidateQuestion(db.Model):
    __tablename__ = 'candidateQuestion'
    candidateQuestionId = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100))    

    def __init__(self, text):
        self.text = text

class CandidateQuestionSchema(ma.Schema):
    class Meta:
        fields = ('candidateQuestionId', 'text')

class CandidateResponseValue(db.Model):
    __tablename__ = 'candidateResponseValue'
    candidateResponseValueId = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100))    
    candidateQuestionId = db.Column(db.Integer, db.ForeignKey("candidateQuestion.candidateQuestionId"))

    def __init__(self, text, candidate_question_id):
        self.text = text
        self.candidateQuestionId = candidate_question_id

class CandidateResponseValueSchema(ma.Schema):
    class Meta:
        fields = ('candidateResponseValueId', 'text', 'candidateQuestionId')


class CandidateResponse(db.Model):
    candidateQuestionId = db.Column(db.Integer, db.ForeignKey("candidateQuestion.candidateQuestionId"), primary_key=True)
    candidateResponseValueId = db.Column(db.Integer, db.ForeignKey("candidateResponseValue.candidateResponseValueId"), primary_key=True)
    candidateId = db.Column(db.Integer, db.ForeignKey("candidate.candidateId"), primary_key=True)

    def __init__(self, candidate_response_value_id, candidate_id, candidate_question_id):
        self.candidateQuestionId = question_id
        self.candidateId = candidate_id
        self.candidateResponseValueId = candidate_response_value_id


class CandidateResponseSchema(ma.Schema):
    class Meta:
        fields = ('candidateResponseValueId', 'locationId', 'candidateQuestionId')



###########################################################
#################### CONSTRAINTS ##########################
###########################################################

class LocationCandidateRejectedResponseValue(db.Model):
    locationResponseValueId = db.Column(db.Integer, db.ForeignKey("locationResponseValue.locationResponseValueId"),  primary_key=True)
    candidateResponseValueId = db.Column(db.Integer, db.ForeignKey("candidateResponseValue.candidateResponseValueId"),  primary_key=True)
    reasonText = db.Column(db.String)
    
    def __init__(self, location_response_value_id, candidate_response_value_id, reason_text):
        self.locationResponseValueId = location_response_value_id
        self.candidateResponseValueId = candidate_response_value_id
        self.reasonText = reason_text

class LocationCandidateRejectedResponseValueSchema(ma.Schema):
    class Meta:
        fields = ('locationResponseValueId', 'candidateResponseValueId', 'reasonText')


class CandidateLocation(db.Model):
    candidateId = db.Column(db.Integer, db.ForeignKey("candidate.candidateId"), primary_key=True)
    locationId = db.Column(db.Integer, db.ForeignKey("location.locationId"), primary_key=True)
    matchStrength = db.Column(db.Float)

    def __init__(self, candidate_id, location_id, match_strength):
        self.candidateId = candidate_id
        self.locationId = location_id
        self.matchStrength = match_strength


class CandidateLocationSchema(ma.Schema):
    class Meta:
        fields = ('candidateId', 'locationId', 'matchStrength')
