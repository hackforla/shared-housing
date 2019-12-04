""" URI routes for when candidates respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import QuestionResponse, ResponseSchema, db

response_schema = ResponseSchema()
response_routes = Blueprint("response_routes", __name__)


@response_routes.route('/<candidate_id>', methods=['POST'])
def add_response(candidate_id):
    response_value = request.json['responseValue']

    new_response = QuestionResponse(response_value, candidate_id)
 
    db.session.add(new_response)
    db.session.commit()

    return response_schema.jsonify(new_response)


# TODO(JOSH): candidate id should not be query-able from question response table, needs to be a join
@response_routes.route('/<candidate_id>', methods=['GET'])
def get_response(candidate_id):
    product = QuestionResponse.query.get(candidate_id)
    return response_schema.jsonify(product)


# TODO(JOSH): implement update function
@response_routes.route('/<candidate_id>', methods=['PUT'])
def put_response(candidate_id):
    return jsonify(candidate_id), 201
