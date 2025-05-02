from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask_bcrypt import Bcrypt
# from flask_pymongo import PyMongo
from routes import routes


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db' : 'hangoutHub',
    'host' : 'mongodb+srv://vkataria:qwerty123@hangouthub.3tpmprg.mongodb.net/hangoutHub?retryWrites=true&w=majority&appName=hangoutHub'

}

CORS(app)

# mongo = PyMongo(app)
db = MongoEngine()
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
bcrypt = Bcrypt()

app.register_blueprint(routes)

from models import User


@login_manager.user_loader
def load_user(user_id):
    return User.objects(pk=user_id).first()

if __name__ == '__main__':
    app.run(debug=True)
