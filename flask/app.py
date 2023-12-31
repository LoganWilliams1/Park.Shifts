from time import sleep

from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from models import db, User, Month, Day, Team, Manager
from config import ApplicationConfig
from flask_cors import CORS
import datetime

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, first_name=first_name, last_name=last_name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/register-team", methods=["POST"])
def register_team():
    email = request.json["email"]
    password = request.json["password"]
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    team = request.json["teamName"]

    manager_exists = Manager.query.filter_by(email=email).first() is not None

    if manager_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password)
    new_manager = Manager(email=email, password=hashed_password, first_name=first_name, last_name=last_name)
    db.session.add(new_manager)
    new_team = Team(team_name=team, manager=new_manager)
    db.session.add(new_team)

    db.session.commit()

    return jsonify({
        "id": new_manager.id,
        "email": new_manager.email
    })


@app.route("/login", methods=["POST", "GET"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    manager = Manager.query.filter_by(email=email).first()

    if user is None and manager is None:
        return jsonify({"Error": "Account Not Found"}), 401

    if user:
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"Error": "Unauthorized"}), 401

        session["user_id"] = user.id

        return jsonify("user")

    if manager:
        if not bcrypt.check_password_hash(manager.password, password):
            return jsonify({"Error": "Unauthorized"}), 401

        session["user_id"] = manager.id

        return jsonify("manager")


@app.route("/dashboard", methods=["POST", "GET"])
def submit_availability():
    if session["user_id"] is None:
        return jsonify({"Error": "Unauthorized"}), 401

    current_user_id = session["user_id"]

    next_month = get_next_month()
    if Month.query.filter_by(user_id=current_user_id, month_name=next_month).first() is None:
        new_month = Month(month_name=next_month, user_id=current_user_id)
        db.session.add(new_month)
        db.session.commit()
        sleep(5)

    next_month_id = Month.query.filter_by(user_id=current_user_id, month_name=next_month).first().id

    available_dates = request.json["availableDates"]
    print(available_dates)

    for i in available_dates.keys():
        new_day = Day(date_int=i, available=available_dates[i], month_id=next_month_id)
        db.session.add(new_day)
        db.session.commit()

    return jsonify({"Message": "Success"}), 200


@app.route("/get-availability", methods=["GET"])
def get_availability():
    if Manager.query.filter_by(id=session["user_id"]).first() is None:
        return jsonify({"Error": "Unauthorized"}), 401

    manager = Manager.query.get(session["user_id"])
    team = manager.team
    users = User.query.filter_by(team_id=team.id).all()
    next_month = get_next_month()
    team_availability = {}

    for user in users:
        name = user.first_name + " " + user.last_name
        user_month = Month.query.filter_by(month_name=next_month, user_id=user.id).first()
        if user_month is None:
            team_availability[name] = -1
        else:
            user_days = Day.query.filter_by(month_id=user_month.id).all()

            available_days = {}
            for day in user_days:
                available_days[day.date_int] = day.available

            team_availability[name] = available_days

    return jsonify(team_availability)


@app.route("/add-user", methods=["POST"])
def add_user():
    if Manager.query.filter_by(id=session["user_id"]).first() is None:
        return jsonify({"Error": "Unauthorized"}), 401

    manager = Manager.query.filter_by(id=session["user_id"]).first()
    team_id = manager.team_id

    user_email = request.json["newUser"]
    user = User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"Error": "User does not exist"}), 404
    user.team_id = team_id
    db.session.commit()

    return jsonify({"Success": team_id})


def get_next_month():
    current_date = datetime.datetime.now()
    next_month_int = current_date.month + 1
    next_month_year_int = current_date.year

    if next_month_int > 12:
        next_month_int = 1
        next_month_year_int += 1

    first_day_next_month_str = current_date.replace(year=next_month_year_int, month=next_month_int, day=1)

    return first_day_next_month_str.strftime('%B %Y')


if __name__ == '__main__':
    app.run(debug=True)
