""" URI routes for when locations respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationResponse, LocationResponseSchema, db, text

location_response_schema = LocationResponseSchema()
location_responses_schema = LocationResponseSchema(many=True)
location_response_routes = Blueprint("location_response_routes", __name__)


@location_response_routes.route('/<question_id>/location/<location_id>', methods=['POST'])
def add_location_response(question_id, location_id):
    location_response_value = request.json['responseValue']

    new_location_response = LocationResponse(location_response_value, location_id, question_id)

    db.session.add(new_location_response)
    db.session.commit()

    return location_response_schema.jsonify(new_location_response)


@location_response_routes.route('/<location_id>', methods=['GET'])
def get_location_response(location_id):
    location_responses = LocationResponse.query.filter_by(locationId=location_id).all()
    return location_responses_schema.jsonify(location_responses)


# TODO(JOSH): implement update function
@location_response_routes.route('/<location_id>', methods=['PUT'])
def put_location_response(location_id):
    return jsonify(location_id), 201
