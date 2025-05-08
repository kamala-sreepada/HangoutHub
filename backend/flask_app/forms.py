from ast import Pass
from flask_login import current_user
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from werkzeug.utils import secure_filename
from wtforms import StringField, SubmitField, TextAreaField, PasswordField, DateField
from wtforms.validators import InputRequired, DataRequired, Length, Email, EqualTo, ValidationError, Optional


# will need to import the user


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(3, 20)])
    Password  = PasswordField('Password', validators=[InputRequired()])
    # submit = SubmitField('Login')

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(3, 20)])
    email = StringField('Email', validators=[InputRequired(), Email()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=6)])
    #confirm_password = PasswordField('Confirm Password', validators=[InputRequired(), EqualTo('password', message='Passwords must match')])

class JoinSessionForm(FlaskForm):
    hangout_code = StringField('Hangout Code', validators=[InputRequired()])
    your_name = StringField('Your Name', validators=[InputRequired()])
    your_email = StringField('Your Email', validators=[InputRequired(), Email()])

class CreateSessionForm(FlaskForm):
    hangout_name = StringField('Hangout Name', validators=[InputRequired()])
    hangout_description = StringField('Hangout Description', validators=[Optional()])
    start_date = DateField('Start Date', validators=[DataRequired()]) # using DataRequired here to have proper data format
    end_date = DateField('End Date', validators=[DataRequired()])