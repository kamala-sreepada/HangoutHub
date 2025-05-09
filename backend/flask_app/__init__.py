from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os

db = MongoEngine('mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub')
login_manager = LoginManager()
bcrypt = Bcrypt()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_pyfile("config.py", silent=False)
    if test_config is not None:
        app.config.update(test_config)

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True, origins=["https://hangouthub-koky.onrender.com/*"])

    from backend.flask_app.routes.users import user
    app.register_blueprint(user)

    from backend.flask_app.routes.sessions import session
    app.register_blueprint(session, url_prefix="/session")

    login_manager.login_view = "users.login"

    return app
