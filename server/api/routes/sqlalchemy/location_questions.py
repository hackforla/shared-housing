"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import LocationQuestion, LocationQuestionSchema, db

location_question_schema = LocationQuestionSchema()
location_questions_schema = LocationQuestionSchema(many=True)
location_question_routes_v2 = Blueprint("location_question_routes_v2", __name__)


@location_question_routes_v2.route('/', methods=['GET'])
def location_questions():
    print('location_questions(): starting...')
    location_questions_list = LocationQuestion.query.all()
    print('location_questions:')
    for c in location_questions_list:
        print('- location_question: {}'.format(c))
    result = location_questions_schema.dump(location_questions_list)
    return jsonify(result), 200

