from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_login import current_user, login_required, login_user, logout_user
from backend.flask_app.models import User, Session
import string
import random
from datetime import datetime


session = Blueprint('sessions', __name__)

# code generator method
def generate_id(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


@session.route('/create', methods=['POST'])
@login_required
def create_session():
    data = request.get_json()
    hangout_name = data.get('name')
    hangout_description = data.get('description')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    # start_date = datetime.fromisoformat(data.get('startDate').replace('Z', '+00:00'))
    # end_date = datetime.fromisoformat(data.get('endDate').replace('Z', '+00:00'))
    
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

    return jsonify({'message' : 'Hangout session created', 'id': id}), 201    

# @session.route('/join', methods=['POST'])
# @login_required
# def join_session():
#     data = request.get_json()
#     hangout_code = data.get('hangout_code')
#     name = data.get('name')
#     email = data.get('email')

#     if not hangout_code or not name or not email:
#         return jsonify({'message': 'Missing fields to join session'}), 400

#     session = Session.objects(id=hangout_code).first()
    # if not session:
    #     return jsonify({'message': 'Session not found'}), 404
    
    # # Check if the user is already a participant
    # for participant in session.participants:
    #     if participant['email'] == email and participant['name'] == name:
    #         return jsonify({'message': 'Already a participant'}), 400
        
    # # Add the user to the session
    # session.participants.append({'name': name, 'email': email})
    # session.save()

    return jsonify({'message': 'Joined the session successfully'}), 200

@session.route('/<session_id>', methods=['GET'])
@login_required
def get_session(session_id):
    session = Session.objects(id=session_id).first()
    if not session:
        return jsonify({'message': 'Session not found'}), 404
    
    # Convert the session object to a dictionary
    session_data = {
        'name': session.name,
        'id': session.id,
        'description': session.description,
        'start_date': session.start_date,
        'end_date': session.end_date,
        'activites': session.activites,
        'participants': session.participants
    }

    return jsonify(session_data), 200