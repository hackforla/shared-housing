from flask import Flask 
from config import Config
from models.models import db, ma
from routes.candidates_response import response_routes

# creates app
def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    return app

app = create_app(Config)

db.init_app(app)
with app.app_context():
    db.create_all()
ma.init_app(app)
app.register_blueprint(response_routes, url_prefix='/api/candidates')
