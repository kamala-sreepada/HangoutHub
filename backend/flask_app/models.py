from flask_login import UserMixin
from . import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    return User.objects(username=user_id()).first()


class User(db.Document, UserMixin):
    username = db.StringField(required=True, unique=True, min_length=1, max_length=40)
    email = db.EmailField(unique=True, required=True)
    password = db.StringField(required=True)

    def get_id(self):
        return self.username
    
    meta = {
        'collection' : 'users'
    }

class Session(db.Document):
    name = db.StringField(required=True)
    id = db.StringField(primary_key=True)
    description = db.StringField()
    start_date = db.DateTimeField(required=True) 
    end_date = db.DateTimeField(required=True)
    participants = db.ListField(db.StringField())

    meta = {
        'collection' : 'sessions'
    }

# class Activities(db.Document):
