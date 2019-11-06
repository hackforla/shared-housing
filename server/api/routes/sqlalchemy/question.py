import os
import sys
sys.path.append(os.path.realpath('.'))
from flask import Blueprint, request
from models.models import Question, QuestionSchema, db

question_schema = QuestionSchema()
question_routes = Blueprint("question_routes", __name__)

# Below we have "candidateid" hardcoded, this should change in the future
@question_routes.route('questionId/question', methods=['POST'])
def add_question():
    questionText = request.json['questionText']
    questionId = request.json['questionId']
 
    new_question = Question(questionText, questionId)
 
    db.session.add(new_question)
    db.session.commit()

    return question_schema.jsonify(new_question)

@question_routes.route('/<formId>/questions', methods=['GET'])
def get_question(formId):
    product = Question.query.get(id)
    return question_schema.jsonify(product)

# Below I hardcoded questionId and responseid
@question_routes.route('/questionId/question/questionId', methods=['PUT'])
def put_question():  
    pass

