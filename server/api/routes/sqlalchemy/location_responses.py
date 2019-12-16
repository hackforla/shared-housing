"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import HousingLocationResponse, HousingLocationResponseSchema, db

location_response_schema = HousingLocationResponseSchema()
location_responses_schema = HousingLocationResponseSchema(many=True)
location_response_routes_v2 = Blueprint("location_response_routes_v2", __name__)


@location_response_routes_v2.route('/', methods=['GET'])
def get_all():
    print('get_all(): starting...')
    location_responses_list = HousingLocationResponse.query.all()
    print('get_all:')
    for c in location_responses_list:
        print('- get_all: {}'.format(c))
    result = location_responses_schema.dump(location_responses_list)
    return jsonify(result), 200

@location_response_routes_v2.route('/<int:location_id>', methods=['GET'])
def get_all_for_location(location_id):
    print('get_all_for_location(): starting...')
    location_responses_list = HousingLocationResponse.query.filter_by(locationId=location_id).all()
    print('get_all_for_location:')
    for c in location_responses_list:
        print('- get_all_for_location: {}'.format(c))
    result = location_responses_schema.dump(location_responses_list)
    return jsonify(result), 200


@location_response_routes_v2.route('/<int:location_id>/responses/<int:question_id>', methods=['POST'])
def submit_one(location_id, question_id):
    if request.is_json:
        locationResponseValueId = int(request.json['locationResponseValueId'])

        locationResponse = HousingLocationResponse(locationResponseValueId, location_id, question_id)
        db.session.add(locationResponse)
        db.session.commit()

        result = location_schema.dump(locationResponse)
        return jsonify(result), 201
    else:
        return jsonify(message='request not valid json'), 500


@location_response_routes_v2.route('/<int:location_id>/responses', methods=['POST'])
def submit_all_for_location():
    if request.is_json:

        locationResponses = request.json['locationResponses']

        for locationResponse in locationResponses:                

            # If a location is added lets kickstart the matching process
            locationQuestionId = int(locationResponse['locationQuestionId'])
            locationResponseValueId = int(request.json['locationResponseValueId'])
            # locationId = int(request.json['locationId'])

            locationResponse = HousingLocationResponse(locationResponseValueId, location_id, locationQuestionId)
            db.session.add(locationResponse)
            db.session.commit()

        result = location_schema.dump(locationResponse)
        return jsonify(result), 201
    else:
        return jsonify(message='request not valid json'), 500

