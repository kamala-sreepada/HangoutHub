from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask_bcrypt import Bcrypt
from flask_app.routes import routes
from flask_app.models import User

db = MongoEngine()
login_manager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config['MONGODB_SETTINGS'] = {
        'db' : 'hangoutHub',
        'host' : 'mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub'
    }
    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    app.register_blueprint(routes)
    return app


# @login_manager.user_loader
# def load_user(user_id):
#     return User.objects(pk=user_id).first()

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
