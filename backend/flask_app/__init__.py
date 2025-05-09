from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os

db = MongoEngine()
login_manager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config['MONGODB_SETTINGS'] = {
        'db': 'hangoutHub',
        'host': 'mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub'
    }
    secret_key = os.urandom(24)

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


    from flask_app.routes import routes
    app.register_blueprint(routes)

    return app
