from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import Form, FormSchema, db

form_schema = FormSchema()
form_routes = Blueprint("form_routes", __name__)


@form_routes.route('/', methods=['POST'])
def add_form():
    form_name = request.json['formName']
    form_description = request.json['formDescription']

    new_form = Form(form_name, form_description)

    db.session.add(new_form)
    db.session.commit()

    return form_schema.jsonify(new_form)


@form_routes.route('/<form_id>', methods=['GET'])
def get_form(form_id):
    form = Form.query.get(form_id)
    return form_schema.jsonify(form)


# TODO(JOSH): implement update functionality for updating a single form
@form_routes.route('/<form_id>', methods=['PUT'])
def put_form(form_id):
    return jsonify(form_id), 201


@form_routes.route('/<form_id>/questions', methods=['GET'])
def get_form_questions(form_id):
    pass

