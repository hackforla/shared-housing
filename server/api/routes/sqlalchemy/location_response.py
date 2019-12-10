""" URI routes for when locations respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationResponse, LocationResponseSchema, db, text
from matcher import constraint_filter

location_response_schema = LocationResponseSchema()
location_responses_schema = LocationResponseSchema(many=True)
location_response_routes = Blueprint("location_response_routes", __name__)


@location_response_routes.route('/<question_id>/location/<location_id>', methods=['POST'])
def add_location_response(question_id, location_id):
    location_response_value = request.json['responseValue']

    new_location_response = LocationResponse(location_response_value, location_id, question_id)

    db.session.add(new_location_response)
    db.session.commit()

    # TODO(JOSH): Needs to be made asynchronous so that we are not waiting for recalculation to complete before
    #  sending the response.
    #  Also, inefficient to recalculate every single time a location response is added. This needs to be optimized.
    constraint_filter.recalculate(new_location_response.locationId)

    return location_response_schema.jsonify(new_location_response)


@location_response_routes.route('/<location_id>', methods=['GET'])
def get_location_response(location_id):
    location_responses = LocationResponse.query.filter_by(locationId=location_id).all()
    return location_responses_schema.jsonify(location_responses)


# TODO(JOSH): implement update function
@location_response_routes.route('/<location_id>', methods=['PUT'])
def put_location_response(location_id):
    return jsonify(location_id), 201
