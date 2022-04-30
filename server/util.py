import jwt
from datetime import datetime, timezone,timedelta
from dotenv import dotenv_values

env = dotenv_values(".env") 

class Config:
    SECRET_KEY = env.get('SECRET_KEY')


class Status:
    OK = 'ok'
    ERROR = 'error'

class GenericMessage:
    SERVER_OK = "server is up and running!"
    SERVR_ERROR = "uh-oh, server is down!"
    NOT_AUTH = "you are not authenticated!"


class Response:

    def __init__(self,status,message=None,data=None):
        self.status = status 
        self.message =  message 
        self.data = data

    def to_map(self):
        """ Return a serializable http response """

        return {
            'status': self.status,
            'message': self.message,
            'data': self.data
        }

def encode_token(user_id):
    """ Encode an auth token """

    return jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.now(tz=timezone.utc) + timedelta(hours=24)
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