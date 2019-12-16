"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationResponseValue, LocationResponseValueSchema, db

location_response_value_schema = LocationResponseValueSchema()
location_response_values_schema = LocationResponseValueSchema(many=True)
location_response_value_routes_v2 = Blueprint("location_response_value_routes_v2", __name__)


@location_response_value_routes_v2.route('/<int:question_id>', methods=['GET'])
def location_response_values(question_id):
    print('location_response_values(): starting...')
    location_response_values_list = LocationResponseValue.query.filter_by(locationQuestionId=question_id).all()
    print('location_response_values:')
    for c in location_response_values_list:
        print('- location_response_value: {}'.format(c))
    result = location_response_values_schema.dump(location_response_values_list)
    return jsonify(result), 200

