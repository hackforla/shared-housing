""" URI routes for when candidates respond to a question."""
import os
import sys
sys.path.append(os.path.realpath('.'))
from flask import Blueprint, request
from models.sqlalchemy.models import QuestionResponse, ResponseSchema, db

response_schema = ResponseSchema()
response_routes = Blueprint("response_routes", __name__)

# Below we have "candidateid" hardcoded, this should change in the future
@response_routes.route('/<candidateId>/response', methods=['POST'])
def add_response(candidateId):
    responseValue = request.json['responseValue']

    new_response = QuestionResponse(responseValue, candidateId)
 
    db.session.add(new_response)
    db.session.commit()

    return response_schema.jsonify(new_response)

@response_routes.route('/<questionId>/responses', methods=['GET'])
def get_response(questionId):
    product = QuestionResponse.query.get(questionId)
    return response_schema.jsonify(product)

# Below I hardcoded candidateid and responseid
@response_routes.route('/candidateId/response/responseId', methods=['PUT'])
def put_response():
    pass
