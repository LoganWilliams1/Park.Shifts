from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)


class Month(db.Model):
    __tablename__ = "months"
    id = db.Column(db.Integer, primary_key=True)
    month_name = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='months')


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_value = db.Column(db.Integer, nullable=False)
    month_id = db.Column(db.Integer, db.ForeignKey('months.id'))
    month = db.relationship('Month', backref='dates')
    availability = db.Column(db.Boolean, nullable=False)
    shift_type = db.Column(db.String)


