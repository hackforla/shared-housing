""" URI routes for when candidates respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import Candidate, CandidateLocation, CandidateSchema, CandidateLocationSchema, db, text
from matcher import constraint_filter

location_candidate_schema = CandidateLocationSchema()
locations_candidate_schema = CandidateLocationSchema(many=True)
candidates_schema = CandidateSchema(many=True)
location_candidate_routes = Blueprint("location_candidate_routes", __name__)


# @candidate_locations_routes.route('/<location_id>/candidate/<candidate_id>', methods=['POST'])
# def add_response(location_id, candidate_id):
#     response_value = request.json['responseValue']
#
#     new_response = CandidateLocation(response_value, candidate_id, location_id)
#
#     db.session.add(new_response)
#     db.session.commit()
#
#     return candidate_location_schema.jsonify(new_response)


@location_candidate_routes.route('/<location_id>', methods=['GET'])
def get_response(location_id):
    """
    Grabs all candidates for a location
    """

    constraint_filter.recalculate(location_id)

    candidate_ids = CandidateLocation.query.filter_by(locationId=location_id).all()
    ids = []
    for candidate in candidate_ids:
        ids.append(candidate.candidateId)

    candidates = Candidate.query.filter(Candidate.candidateId.in_(ids)).all()
    return candidates_schema.jsonify(candidates)


# TODO(JOSH): implement update function
# @candidate_locations_routes.route('/<location_id>', methods=['PUT'])
# def put_response(location_id):
#     return jsonify(location_id), 201
