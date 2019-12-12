""" URI routes for when candidates respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import QuestionResponse, QuestionResponseSchema, db, text


response_schema = QuestionResponseSchema()
responses_schema = QuestionResponseSchema(many=True)
response_routes = Blueprint("response_routes", __name__)


@response_routes.route('/<question_id>/candidate/<candidate_id>', methods=['POST'])
def add_response(question_id, candidate_id):
    response_value = request.json['responseValue']

    new_response = QuestionResponse(response_value, candidate_id, question_id)
 
    db.session.add(new_response)
    db.session.commit()

    return response_schema.jsonify(new_response)


@response_routes.route('/<candidate_id>', methods=['GET'])
def get_response(candidate_id):
    responses = QuestionResponse.query.filter_by(candidateId=candidate_id).all()
    return responses_schema.jsonify(responses)


# TODO(JOSH): implement update function
@response_routes.route('/<candidate_id>', methods=['PUT'])
def put_response(candidate_id):
    return jsonify(candidate_id), 201
