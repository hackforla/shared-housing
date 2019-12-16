"""REST API handling add, update and retrieval operations on the housing candidate resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import CandidateResponseValue, CandidateResponseValueSchema, db

candidate_response_value_schema = CandidateResponseValueSchema()
candidate_response_values_schema = CandidateResponseValueSchema(many=True)
candidate_response_value_routes_v2 = Blueprint("candidate_response_value_routes_v2", __name__)


@candidate_response_value_routes_v2.route('/<int:question_id>', methods=['GET'])
def candidate_response_values(question_id):
    print('candidate_response_values(): starting...')
    candidate_response_values_list = CandidateResponseValue.query.filter_by(candidateQuestionId=question_id).all()
    print('candidate_response_values:')
    for c in candidate_response_values_list:
        print('- candidate_response_value: {}'.format(c))
    result = candidate_response_values_schema.dump(candidate_response_values_list)
    return jsonify(result), 200

