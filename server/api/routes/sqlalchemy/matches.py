"""REST API handling add, update and retrieval operations on the housing candidate resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import CandidateResponse, CandidateResponseSchema, LocationCandidateRejectedResponseValue, db

candidate_response_schema = CandidateResponseSchema()
candidate_responses_schema = CandidateResponseSchema(many=True)
candidate_response_routes_v2 = Blueprint("candidate_response_routes_v2", __name__)


@candidate_response_routes_v2.route('/', methods=['GET'])
def get_all():
    print('get_all(): starting...')
    candidate_responses_list = CandidateResponse.query.all()
    print('get_all:')
    for c in candidate_responses_list:
        print('- get_all: {}'.format(c))
    result = candidate_responses_schema.dump(candidate_responses_list)
    return jsonify(result), 200

@candidate_response_routes_v2.route('/<int:location_id>', methods=['GET'])
def get_all_matches_for_location(location_id):

    # get location responses
    location_responses = HousingLocationResponse.query.filter_by(locationId=location_id).all()

    # get all candidate responses
    candidate_responses_list = CandidateResponse.query.all()

    # get constraints for location
    for location_response in location_responses:
        constraints = LocationCandidateRejectedResponseValue.query.filter_by(locationResponseValueId=location_response.location_response).all()
        



    # filter




    for c in candidate_responses_list:
        print('- get_all_for_candidate: {}'.format(c))
    result = candidate_responses_schema.dump(candidate_responses_list)
    return jsonify(result), 200


