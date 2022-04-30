from flask import Flask, redirect, request, jsonify
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
from routes import Url 
from user import UserService
from db import Database
from util import get_bearer_token

env = dotenv_values(".env") 
app = Flask(__name__)
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

    return jsonify(UserService.ping())

@app.post(Url.USERS_REGISTER)
def users_register():
    """ Handle user registration """

    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    return jsonify(UserService.register(
        db,
        username,
        email,
        bcrypt.generate_password_hash(password)
    ))

@app.post(Url.USERS_LOGIN)
def users_login():
    """ Handle user login """ 

    username = request.json.get('username')
    email =  request.json.get('email')
    password = request.json.get('password')
    return jsonify(UserService.login(
        db,
        username,
        email,
        password,
        bcrypt.check_password_hash,
    ))

@app.get(Url.USERS_GET_MYSELF)
def users_get_myself():
    """ Handle user get info """

    token = get_bearer_token(request.headers)
    return jsonify(UserService.get_myself(db,token))

@app.post(Url.USERS_REF_TOKEN)
def users_ref_token():
    """ Handle refreshing of auth token """

    token = get_bearer_token(request.headers)
    return jsonify(UserService.refresh_token(token))

""" END OF USERS API ENDPOINT """

if __name__=="__main__":
    try:
        app.run(port=env.get("SERVER_PORT"),debug=True)
    except KeyboardInterrupt:
        db.close_connection()
    

