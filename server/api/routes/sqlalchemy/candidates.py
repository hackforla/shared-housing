from flask import Blueprint, request
from models.sqlalchemy.models import Candidate, CandidateSchema, db

candidate_schema = CandidateSchema()
candidate_routes = Blueprint("candidate_routes", __name__)


@candidate_routes.route('/candidates/<candidateId>', methods=['GET'])
def get_candidate(candidateId):
    product = Candidate.query.get(candidateId)
    return candidate_schema.jsonify(product)


@candidate_routes.route('/candidates', methods=['POST'])
def add_candidate():
    name = request.json['name'] 
    new_candidate = Candidate(name)
 
    db.session.add(new_candidate)
    db.session.commit()
    return candidate_schema.jsonify(new_candidate)


@candidate_routes.route('/candidates/<candidateId>', methods=['PUT'])
def put_candidate(candidateId):
    update_candidate = Candidate.query.filter_by(candidateId=candidateId)
    update_candidate.name = request.json['name']
    db.session.commit()
    return candidate_schema.jsonify(update_candidate)


@candidate_routes.route('/candidates/<candidateId>', methods=['PATCH'])
def patch_candidate(candidateId):
    print("patching..")
    pass