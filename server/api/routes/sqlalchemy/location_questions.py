"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationQuestion, LocationQuestionSchema, LocationResponseValue, LocationResponseValueSchema, db

location_question_schema = LocationQuestionSchema()
location_questions_schema = LocationQuestionSchema(many=True)
location_question_routes_v2 = Blueprint("location_question_routes_v2", __name__)


@location_question_routes_v2.route('/', methods=['GET'])
def get_location_questions():

    location_questions_list = LocationQuestion.query.all()

    result = []

    for location_question in location_questions_list:
        item = {
            'text': location_question.text,
            'id': location_question.locationQuestionId,
            'responseValues': []
        }
        response_values = LocationResponseValue.query.filter_by(locationQuestionId=location_question.locationQuestionId)
        for response_value in response_values:
            item['responseValues'].append({
                'locationResponseValueId': response_value.locationResponseValueId,
                'text': response_value.text
            })

        result.append(item)


    return jsonify(result), 200

@location_question_routes_v2.route('/', methods=['POST'])
def add_location_question():
    question_text = str(request.json['text'])
    response_values = request.json['responseValues']
    print('question_text: {}'.format(question_text))
    print('response_values: {}'.format(response_values))
    new_location_question = LocationQuestion(question_text)
    db.session.add(new_location_question)
    db.session.commit()

    for response_value in response_values:
        print('- response_value: {}'.format(response_value))
        new_response_value = LocationResponseValue(response_value, new_location_question.locationQuestionId)
        db.session.add(new_response_value)
        db.session.commit()


    return location_question_schema.jsonify(new_location_question), 200

