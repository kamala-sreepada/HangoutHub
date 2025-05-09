from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_login import current_user, login_required, login_user, logout_user
from backend.flask_app.models import User, Session
import string
import random


routes = Blueprint('users', __name__)


# code generator method
def generate_id(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


@routes.route("/", methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to Hangout hub'})


@routes.route("/signup", methods = ["GET", "POST"])
def signup():
    # if current_user.is_authenticated:
    #     return jsonify({'message': 'Already logged in'}), 400

    data = request.get_json(force=True, silent=True)
    print(data)
    if data is None:
        return jsonify({'message': 'Invalid or missing JSON in request body'}), 400
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing Fields'}), 400
    
    # if User.objects(username=username).first():
    #     return jsonify({'message': 'Username already exists'}), 400
    
    # if User.objects(email=email).first():
    #     return jsonify({'message':'Email already exists'}), 400
    

    # hashed = generate_password_hash(password)
    users = User(username=username, email=email, password=password)
    # print("User", user.username, user.email, user.password)
    users.save()

    return jsonify({'message':'User registered successfully'}), 201


@routes.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return jsonify({'message' : 'Already logged in'}), 400
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message':'Missing fields to login'}), 400
    
    user = User.objects(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message':'Login successful'}), 200
    else:
        return jsonify({'message':'Invalid username or password'}), 401
    

@routes.route('/session/create', methods=['POST'])
@login_required
def create_session():
    data = request.get_json()
    hangout_name = data.get('name')
    hangout_description = data.get('description')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    
    if not hangout_name or not start_date or not end_date:
        return jsonify({'message': 'Missing fields to create session'}), 400
    
    while True:
        id = generate_id()
        existing = Session.objects(id=id).first()
        if not existing:
            break
    
    session = Session(
        name = hangout_name,
        id = id,
        description =  hangout_description,
        start_date = start_date,
        end_date = end_date,
        participants = []
    )
    session.save()

    return jsonify({'message' : 'Hangout sessoin created', 'id': id}), 201


    

@routes.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message':'Logged out successfully'}), 200





    
    

