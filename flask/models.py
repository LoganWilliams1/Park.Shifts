from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class Team(db.Model):
    __tablename__ = "teams"
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(100), unique=True, nullable=False)
    manager = db.relationship('Manager', uselist=False, back_populates='team')


class Manager(db.Model):
    __tablename__ = "managers"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team = db.relationship('Team', uselist=False, back_populates='manager')


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team = db.relationship('Team', backref='users')


class Month(db.Model):
    __tablename__ = "months"
    id = db.Column(db.Integer, primary_key=True)
    month_name = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='months')


class Day(db.Model):
    __tablename__ = "days"
    id = db.Column(db.Integer, primary_key=True)
    date_int = db.Column(db.Integer, nullable=False)
    month_id = db.Column(db.Integer, db.ForeignKey('months.id'))
    month = db.relationship('Month', backref='dates')
    shift_type = db.Column(db.String)
    hours = db.Column(db.Integer)
