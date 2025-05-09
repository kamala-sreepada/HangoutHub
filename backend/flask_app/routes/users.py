from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_login import current_user, login_required, login_user, logout_user
from backend.flask_app.models import User, Session
import string
import random


user = Blueprint('users', __name__)


@user.route("/", methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to Hangout hub'})


@user.route("/signup", methods = ["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return jsonify({'message': 'Already logged in'}), 400

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
    

    hashed = generate_password_hash(password)
    users = User(username=username, email=email, password=hashed)
    # print("User", user.username, user.email, user.password)
    users.save()

    return jsonify({'message':'User registered successfully'}), 201

@user.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return jsonify({'message' : 'Already logged in'}), 400
    
    data = request.get_json()
    print("Data: ", data)
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

@user.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    return jsonify({'message': 'Welcome to your dashboard', 'username': current_user.username}), 200

@user.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message':'Logged out successfully'}), 200





    
    

