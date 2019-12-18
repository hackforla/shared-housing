"""REST API handling add, update and retrieval operations on the housing candidate resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import CandidateResponse, CandidateResponseSchema, db

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

@candidate_response_routes_v2.route('/<int:candidate_id>', methods=['GET'])
def get_all_for_candidate(candidate_id):
    print('get_all_for_candidate(): starting...')
    candidate_responses_list = CandidateResponse.query.filter_by(candidateId=candidate_id).all()
    print('get_all_for_candidate:')
    for c in candidate_responses_list:
        print('- get_all_for_candidate: {}'.format(c))
    result = candidate_responses_schema.dump(candidate_responses_list)
    return jsonify(result), 200


@candidate_response_routes_v2.route('/<int:candidate_id>/responses/<int:question_id>', methods=['POST'])
def submit_one(candidate_id, question_id):
    if request.is_json:
        candidateResponseValueId = int(request.json['candidateResponseValueId'])

        candidateResponse = CandidateResponse(candidateResponseValueId, candidate_id, question_id)
        db.session.add(candidateResponse)
        db.session.commit()

        result = candidate_schema.dump(candidateResponse)
        return jsonify(result), 201
    else:
        return jsonify(message='request not valid json'), 500


@candidate_response_routes_v2.route('/<int:candidate_id>/responses', methods=['POST'])
def submit_all_for_candidate():
    if request.is_json:

        candidateResponses = request.json['candidateResponses']

        for candidateResponse in candidateResponses:                

            candidateQuestionId = int(candidateResponse['candidateQuestionId'])
            candidateResponseValueId = int(request.json['candidateResponseValueId'])

            candidateResponse = CandidateResponse(candidateResponseValueId, candidate_id, candidateQuestionId)
            db.session.add(candidateResponse)
            db.session.commit()

        result = candidate_schema.dump(candidateResponse)
        return jsonify(result), 201
    else:
        return jsonify(message='request not valid json'), 500

