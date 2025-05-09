from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os

db = MongoEngine()
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
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    from backend.flask_app.routes import routes
    app.register_blueprint(routes)
    
    return app
