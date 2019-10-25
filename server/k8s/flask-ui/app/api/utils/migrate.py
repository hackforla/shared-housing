import os
import sys
sys.path.append(os.path.realpath('.'))
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from main import create_app 
from models.models import db
from config import Config

app = create_app(Config)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
