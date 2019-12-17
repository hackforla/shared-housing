""" URI routes for when locations respond to a question."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationCandidateRejectedResponseValue, LocationCandidateRejectedResponseValueSchema, db, text
from matcher import constraint_filter

rejected_value_schema = LocationCandidateRejectedResponseValueSchema()
rejected_values_schema = LocationCandidateRejectedResponseValueSchema(many=True)
rejected_value_routes = Blueprint("rejected_value_routes", __name__)


@rejected_value_routes.route('/', methods=['POST'])
def add_rejected_value():

    location_response_value = request.json['locationResponseValueId']
    candidate_response_value = request.json['candidateResponseValueId']
    reason_text = request.json['reasonText']

    new_rejected_value = LocationCandidateRejectedResponseValue(location_response_value, candidate_response_value, reason_text)

    db.session.add(new_rejected_value)
    db.session.commit()

    return rejected_value_schema.jsonify(new_rejected_value)



@rejected_value_routes.route('/', methods=['GET'])
def get_rejected_values():
    rejected_values = LocationCandidateRejectedResponseValue.query.all()
    return rejected_values_schema.jsonify(rejected_values)

@rejected_value_routes.route('/<int:location_response_value_id>', methods=['GET'])
def get_rejected_values_by_response_id(location_response_value_id):
    rejected_values = LocationCandidateRejectedResponseValue.query.filter_by(locationResponseValueId=location_response_value_id)
    return rejected_values_schema.jsonify(rejected_values)




