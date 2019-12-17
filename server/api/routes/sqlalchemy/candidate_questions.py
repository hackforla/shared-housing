"""REST API handling add, update and retrieval operations on the housing candidate resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import (
    CandidateQuestion, 
    CandidateQuestionSchema, 
    CandidateResponseValue, 
    CandidateResponseValueSchema,  
    db
)



candidate_question_schema = CandidateQuestionSchema()
candidate_questions_schema = CandidateQuestionSchema(many=True)
candidate_question_routes_v2 = Blueprint("candidate_question_routes_v2", __name__)



@candidate_question_routes_v2.route('/', methods=['GET'])
def get_candidate_questions():

    candidate_questions_list = CandidateQuestion.query.all()

    result = []

    for candidate_question in candidate_questions_list:

        item = {
            'text': candidate_question.text,
            'id': candidate_question.candidateQuestionId,
            'responseValues': []
        }

        response_values = CandidateResponseValue.query.filter_by(candidateQuestionId=candidate_question.candidateQuestionId)

        for response_value in response_values:
            item['responseValues'].append({
                'candidateResponseValueId': response_value.candidateResponseValueId,
                'text': response_value.text
            })

        result.append(item)

    return jsonify(result), 200



@candidate_question_routes_v2.route('/', methods=['POST'])
def add_candidate_question():
    question_text = str(request.json['text'])
    response_values = request.json['responseValues']
    print('question_text: {}'.format(question_text))
    print('response_values: {}'.format(response_values))
    new_candidate_question = CandidateQuestion(question_text)
    db.session.add(new_candidate_question)
    db.session.commit()

    for response_value in response_values:
        print('- response_value: {}'.format(response_value))
        new_response_value = CandidateResponseValue(response_value, new_candidate_question.candidateQuestionId)
        db.session.add(new_response_value)
        db.session.commit()

    return candidate_question_schema.jsonify(new_candidate_question), 200

