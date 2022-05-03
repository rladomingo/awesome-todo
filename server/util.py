import jwt
from datetime import datetime, timezone,timedelta
from dotenv import dotenv_values
from flask import Response
import json

env = dotenv_values(".env") 

class Config:
    SECRET_KEY = env.get('SECRET_KEY')
    TOKEN_EXP_DURATION = 100


class Status:
    OK = 'ok'
    ERROR = 'error'
    CREATED = 'created'
    UNAUTHORIZED = 'unauthorized'
    BAD_REQ = 'bad_request'

class Message:
    UNAUTHORIZED = "You are not authenticated!"
    INVALID_CRED = "Invalid username/email!"
    INVALID_PW = "Invalid password!"
    NO_USER = "No user found!"
    USER_FOUND = "Successfully found the user!"
    LOGGED_IN = "Succesffuly logged in!"
    SERVER_OK = "Server is up and running!"
    REGISTERED = "Succesffully created a user!"
    TOKENIZE = "Here is your new auth token!"


class Res(Response):

    def __init__(self,status,message=None,data=None):
        super().__init__(
            json.dumps({
                'status': status,
                'msg': message,
                'data': data
            }),
            status=self.http_code(status),
            mimetype='application/json'
        )

    def http_code(self,status):
        code = None 
        if status == Status.OK:
            code = 200
        elif status == Status.CREATED:
            code = 201
        elif status == Status.UNAUTHORIZED:
            code = 401
        elif status == Status.ERROR:
            code = 500
        elif status == Status.BAD_REQ:
            code = 400
        return code

def encode_token(user_id):
    """ Encode an auth token """

    return jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.now(tz=timezone.utc) + timedelta(hours=24*Config.TOKEN_EXP_DURATION)
        }, 
        Config.SECRET_KEY, 
        algorithm="HS256"
    )

def decode_token(token):
    """ Deocde an auth token """

    return jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])

def get_bearer_token(headers):
    """" Parse bearer token """
    
    return headers.get('Authorization').split(" ")[1]