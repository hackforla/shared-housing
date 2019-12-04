from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import Question, QuestionSchema, db

question_schema = QuestionSchema()
question_routes = Blueprint("question_routes", __name__)


@question_routes.route('/', methods=['POST'])
def add_question():
    question_text = request.json['questionText']

    new_question = Question(question_text)
 
    db.session.add(new_question)
    db.session.commit()

    return question_schema.jsonify(new_question)


@question_routes.route('/<question_id>', methods=['GET'])
def get_question(question_id):
    question = Question.query.get(question_id)
    return question_schema.jsonify(question)


# TODO(JOSH): implement update functionality for updating a single question
@question_routes.route('/<question_id>', methods=['PUT'])
def put_question(question_id):
    return jsonify(question_id), 201

