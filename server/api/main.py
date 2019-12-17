""" The main file is where we initialize the flask application,
the database, marshamallow library and where we register our api blueprints."""
from flask import Flask, render_template, send_from_directory
from config import Config

from models.sqlalchemy.models import (
    db, 
    ma, 
    HousingLocation, 
    LocationSchema, 
    Candidate, 
    CandidateSchema, 
    Question, 
    QuestionResponse, 
    LocationResponse, 
    CandidateLocation,
    CandidateQuestion,
    CandidateQuestionSchema,
    CandidateResponseValue,
    CandidateResponseValueSchema,
    CandidateResponse,
    CandidateResponseSchema,
    LocationQuestion,
    LocationQuestionSchema,
    LocationResponseValue,
    LocationResponseValueSchema,
    HousingLocationResponse,
    HousingLocationResponseSchema,
    LocationCandidateRejectedResponseValue
)

from routes.sqlalchemy.candidates_response import response_routes
from routes.sqlalchemy.candidates import candidate_routes
from routes.sqlalchemy.question import question_routes
from routes.sqlalchemy.form import form_routes
from routes.sqlalchemy.location_resources import location_routes
from routes.sqlalchemy.location_response import location_response_routes
from routes.sqlalchemy.location_candidate import location_candidate_routes
from routes.sqlalchemy.location_responses import location_response_routes_v2
from routes.sqlalchemy.candidate_responses import candidate_response_routes_v2
from routes.sqlalchemy.location_questions import location_question_routes_v2
from routes.sqlalchemy.candidate_questions import candidate_question_routes_v2
from routes.sqlalchemy.location_response_values import location_response_value_routes_v2
from routes.sqlalchemy.candidate_response_values import candidate_response_value_routes_v2
from routes.sqlalchemy.rejected_values import rejected_value_routes



# app.register_blueprint(location_response_routes_v2, url_prefix='/api/v2/locationresponses')
# app.register_blueprint(candidate_response_routes_v2, url_prefix='/api/v2/candidateresponses')

# app.register_blueprint(location_question_routes_v2, url_prefix='/api/v2/locationquestions')
# app.register_blueprint(candidate_question_routes_v2, url_prefix='/api/v2/candidatequestions')

from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '%(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://sys.stdout',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

# creates app
LOCAL_HOST = False



def seed_db_v1():

    from faker import Faker
    fake = Faker()

    NUM_CANDIDATES = 10
    NUM_LOCATIONS = 10

    questions = [
        {"candidateQuestion": "Do you smoke?", "locationQuestion": "Do you allow smokers?", "isConstraint": False, "inverseRelationship": False},
        {"candidateQuestion": "Do you require a handicap accessible unit?", "locationQuestion": "Is the unit handicap accessible?", "isConstraint": False, "inverseRelationship": False}
    ]

    db.session.query(LocationCandidateRejectedResponseValue).delete()
    db.session.query(CandidateLocation).delete()
    db.session.query(QuestionResponse).delete()
    db.session.query(LocationResponse).delete()
    db.session.query(Candidate).delete()
    db.session.query(HousingLocation).delete()
    db.session.query(Question).delete()
    db.session.commit()

    for i in range(NUM_CANDIDATES):            
        new_candidate = Candidate(fake.name())    
        db.session.add(new_candidate)
        db.session.commit()

    for i in range(NUM_LOCATIONS):       
        location = HousingLocation(fake.latitude(), fake.longitude(), 1, 1, fake.street_address())
        db.session.add(location)
        db.session.commit()

    for question in questions:       
        q = Question(question['candidateQuestion'], question['locationQuestion'], question['isConstraint'], question['inverseRelationship'])
        db.session.add(q)
        db.session.commit()

def seed_db():

    from faker import Faker
    fake = Faker()

    NUM_CANDIDATES = 10
    NUM_LOCATIONS = 10

    location_questions = [
        {'text': 'Do you allow smoking?', 'responseValues': ['yes', 'no']},
        {'text': 'Do you allow pets?', 'responseValues': ['yessir', 'noway', 'maybe']}
    ]

    candidate_questions = [
        {'text': 'Do you smoke?', 'responseValues': ['yes', 'no']},
        {'text': 'Do you have pet(s)?', 'responseValues': ['yessir', 'noway', 'maybe']}
    ]

    # from v1
    db.session.query(CandidateLocation).delete()
    db.session.query(QuestionResponse).delete()
    db.session.query(LocationResponse).delete()

    # matches
    db.session.query(LocationCandidateRejectedResponseValue).delete()

    # candidate resources
    db.session.query(CandidateResponseValue).delete()
    db.session.query(CandidateResponse).delete()
    db.session.query(Candidate).delete()
    db.session.query(CandidateQuestion).delete()

    # location resources
    db.session.query(LocationResponseValue).delete()
    db.session.query(HousingLocationResponse).delete()
    db.session.query(HousingLocation).delete()
    db.session.query(LocationQuestion).delete()

    db.session.commit()

    for i in range(NUM_CANDIDATES):            
        new_candidate = Candidate(fake.name())    
        db.session.add(new_candidate)
        db.session.commit()

    for i in range(NUM_LOCATIONS):       
        location = HousingLocation(fake.latitude(), fake.longitude(), 1, 1, fake.street_address())
        db.session.add(location)
        db.session.commit()

    for question in location_questions:       
        q = LocationQuestion(question['text'])
        db.session.add(q)
        db.session.commit()
        app.logger.debug('added candidate question: {}'.format(q.locationQuestionId))
        for qrv in question['responseValues']:
            rv = LocationResponseValue(qrv, q.locationQuestionId)
            db.session.add(rv)
        db.session.commit()

    for question in candidate_questions:       
        q = CandidateQuestion(question['text'])
        db.session.add(q)
        db.session.commit()
        app.logger.debug('added candidate question: {}'.format(q.candidateQuestionId))
        for qrv in question['responseValues']:
            rv = CandidateResponseValue(qrv, q.candidateQuestionId)
            db.session.add(rv)
        db.session.commit()


# Function that initializes the application. 
def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    return app

app = create_app(Config)
app.logger.debug('app initialized...')

# Connects the database to the application.
print('PG: initializing...')
db.init_app(app)
with app.app_context():
    db.create_all()
    seed_db()

# Bounds the scoped session created by SQLAlchemy to flask marshmallow schema.
app.logger.debug('Marshmallow: initializing...')
ma.init_app(app)

# Blueprints for APIs
app.logger.debug('registering blueprints...')

app.register_blueprint(candidate_routes, url_prefix='/api/v1/candidates')
app.register_blueprint(location_routes, url_prefix='/api/v1/locations')

app.register_blueprint(form_routes, url_prefix='/api/v1/forms')
app.register_blueprint(location_candidate_routes, url_prefix='/api/v1/locationcandidates')
app.register_blueprint(location_response_routes, url_prefix='/api/v1/locationresponses')
app.register_blueprint(question_routes, url_prefix='/api/v1/questions')
app.register_blueprint(response_routes, url_prefix='/api/v1/responses')

# Blueprints for V2 APIs
app.register_blueprint(location_response_routes_v2, url_prefix='/api/v2/locationresponses')
# app.register_blueprint(candidate_response_routes_v2, url_prefix='/api/v2/candidateresponses')

app.register_blueprint(location_response_value_routes_v2, url_prefix='/api/v2/locationresponsevalues')
app.register_blueprint(candidate_response_value_routes_v2, url_prefix='/api/v2/candidateresponsevalues')
app.register_blueprint(location_question_routes_v2, url_prefix='/api/v2/locationquestions')
app.register_blueprint(candidate_question_routes_v2, url_prefix='/api/v2/candidatequestions')
app.register_blueprint(rejected_value_routes, url_prefix='/api/v2/rejectedvalues')



@app.route("/")
def index():
    app.logger.info('/index')
    return render_template("index.html")

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        app.root_path, 
        'favicon.ico', 
        mimetype='image/vnd.microsoft.icon'
    )

if __name__ == "__main__":
    if LOCAL_HOST:
        print('running on 8765...')
        app.run(host="0.0.0.0", port=8765)
    else:
        app.run(host="0.0.0.0", port=80)