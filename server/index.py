from flask import Flask, redirect, request, jsonify
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
from routes import Url
from user import UserService
from db import Database
from util import get_bearer_token
from flask_cors import CORS

env = dotenv_values(".env")
app = Flask(__name__)
cors = CORS(
    app,
    origins=['http://localhost:3000'],
)
db = Database(
    env.get("USERNAME"),
    env.get("PASSWORD"),
    env.get("DATABASE")
)
bcrypt = Bcrypt(app)

""" START OF USERS API ENDPOINT  """


@app.get(Url.USERS_PING)
def users_ping():
    """ Handle users endpoint health check """

    return UserService.ping()


@app.post(Url.USERS_REGISTER)
def users_register():
    """ Handle user registration """

    return UserService.register(
        db,
        request.json.get('username'),
        request.json.get('email'),
        bcrypt.generate_password_hash(request.json.get('password'))
    )


@app.post(Url.USERS_LOGIN)
def users_login():
    """ Handle user login """

    return UserService.login(
        db,
        request.json.get('username'),
        request.json.get('email'),
        request.json.get('password'),
        bcrypt.check_password_hash,
    )


@app.get(Url.USERS_GET_MYSELF)
def users_get_myself():
    """ Handle user get info """

    # print(request.headers.get("Authorization"))

    token = get_bearer_token(request.headers)
    return UserService.get_myself(db, token)


@app.post(Url.USERS_REF_TOKEN)
def users_ref_token():
    """ Handle refreshing of auth token """

    token = get_bearer_token(request.headers)
    return UserService.refresh_token(token)


""" END OF USERS API ENDPOINT """

if __name__ == "__main__":
    try:
        app.run(port=env.get("SERVER_PORT"), debug=True)
    except KeyboardInterrupt:
        db.close_connection()
