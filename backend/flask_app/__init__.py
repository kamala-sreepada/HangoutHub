from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager

db = MongoEngine()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['MONGODB_SETTINGS'] = {
        'db': 'hangoutHub',
        'host': 'mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub'
    }
    db.init_app(app)
    login_manager.init_app(app)
    return app