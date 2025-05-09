from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt

db = MongoEngine()
login_manager = LoginManager()
bcrypt = Bcrypt()

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'hangoutHub',
    'host': 'mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub'
}

db.init_app(app)
login_manager.init_app(app)
bcrypt.init_app(app)
CORS(app)

from flask_app.routes import routes
app.register_blueprint(routes)
