""" The main file is where we initialize the flask application,
the database, marshamallow library and where we register our api blueprints."""
from flask import Flask 
from config import Config
from models.sqlalchemy.models import db, ma
from routes.sqlalchemy.candidates_response import response_routes
from routes.sqlalchemy.candidates import candidate_routes
# creates app

# Function that initializes the application. 
def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    return app

app = create_app(Config)

# Connects the database to the application.
db.init_app(app)
with app.app_context():
    db.create_all()

# Bounds the scoped session created by SQLAlchemy to flask marshamallow schema.
ma.init_app(app)

# Blueprints for APIs
app.register_blueprint(response_routes, url_prefix='/api/candidates')
app.register_blueprint(candidate_routes, url_prefix='/api')
