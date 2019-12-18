from flask import Blueprint, request
from models.sqlalchemy.models import Candidate, CandidateSchema, db

candidate_schema = CandidateSchema()
candidate_routes = Blueprint("candidate_routes", __name__)

candidates_schema = CandidateSchema(many=True)

@candidate_routes.route('/', methods=['GET'])
def get_all_candidates():

    print('get_all_candidates(): starting...')
    candidates = Candidate.query.all()

    print('candidates:')
    for c in candidates:
        print('- candidate: {}'.format(c))

    return candidates_schema.jsonify(candidates)


@candidate_routes.route('/<candidate_id>', methods=['GET'])
def get_candidate(candidate_id):
    product = Candidate.query.get(candidate_id)
    return candidate_schema.jsonify(product)


@candidate_routes.route('/', methods=['POST'])
def add_candidate():
    name = request.json['name'] 
    new_candidate = Candidate(name)
 
    db.session.add(new_candidate)
    db.session.commit()
    return candidate_schema.jsonify(new_candidate)


# TODO(JOSH): does not actually update data, just returns query with the name changed
@candidate_routes.route('/<candidateId>', methods=['PUT'])
def put_candidate(candidateId):
    update_candidate = Candidate.query.filter_by(candidateId=candidateId)
    update_candidate.name = request.json['name']
    db.session.commit()
    return candidate_schema.jsonify(update_candidate)


@candidate_routes.route('/<candidateId>', methods=['PATCH'])
def patch_candidate(candidateId):
    print("patching..")
    pass