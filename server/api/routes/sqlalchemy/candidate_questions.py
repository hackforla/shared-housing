"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import CandidateQuestion, CandidateQuestionSchema, db

candidate_question_schema = CandidateQuestionSchema()
candidate_questions_schema = CandidateQuestionSchema(many=True)
candidate_question_routes_v2 = Blueprint("candidate_question_routes_v2", __name__)


@candidate_question_routes_v2.route('/', methods=['GET'])
def candidate_questions():
    print('candidate_questions(): starting...')
    candidate_questions_list = CandidateQuestion.query.all()
    print('candidate_questions:')
    for c in candidate_questions_list:
        print('- candidate_question: {}'.format(c))
    result = candidate_questions_schema.dump(candidate_questions_list)
    return jsonify(result), 200

