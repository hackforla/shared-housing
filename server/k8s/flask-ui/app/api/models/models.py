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
