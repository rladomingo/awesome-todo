from util import Status, encode_token, decode_token, Res, Message
from flask import Response
import json
from sql import SQL

class User:

    def __init__(self,data):
        self.user_id = data[0]
        self.username = data[1] 
        self.email = data[2]
        self.password = data[3]

    def to_map(self):
        """ Return a serializable user data """
        
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            # 'password': self.password
        }

class UserService:

    def __init__(self,app):
        self.app = app 

    @staticmethod
    def ping():
        """ Check /users endpoint's health """

        # Return health check
        return Res(
            Status.OK,
            message=Message.SERVER_OK,
            data={"ping":"pong"}
        )

    @staticmethod 
    def register(db,username,email,password):
        """ Register a new user """

        # Return bad request
        if not username or not email or not password:
            return Res(
                Status.BAD_REQ,
                message=Message.INVALID_CRED
            )
  
        try:
            # Create a new user
            res = db.sql_query(
                SQL.USER_REGISTER,
                (username,email,password,),
                commit=True
            )
            # Return successfuly creation
            return Res(
                Status.CREATED,
                message=Message.REGISTERED,
                data={'user_id': res}
            )
        except Exception as error:
            # Return db error
            return Res(
                Status.ERROR,
                message=str(error),
            )

    @staticmethod
    def login(db,username,email,password,check_pw):
        """ Login an existing user """

        # Return bad request
        if not username and not email:
            return Res(
                Status.BAD_REQ,
                message=Message.INVALID_CRED
            )

        # Return bad request
        if not password:
            return Res(
                Status.NOT_AUTH,
                message=Message.INVALID_PW
            )

        # Choose an index to query
        query_string = None 
        arg = None 
        if username and not email:
            query_string = SQL.USER_SELECT_USERNAME
            arg = username
        elif email and not username:
            query_string = SQL.USER_SELECT_EMAIL
            arg = email

        try:
            # Find user using selected index
            users = db.sql_query(
                query_string,
                (arg,)
            )
        except Exception as error:
            # Return db error
            return Res(
                Status.ERROR,
                message=str(error)
            )

        # Return user not found
        if len(users) == 0:
            return Res(
                Status.BAD_REQ,
                message=Message.NO_USER
            )

        user = User(users[0])

        # Return error if invalid user
        if not check_pw(user.password,password):
            return Res(
                Status.BAD_REQ,
                message=Message.INVALID_PW
            )

        # Return auth token
        return Res(
            Status.OK,
            message=Message.LOGGED_IN,
            data={'token': encode_token(user.user_id)}
        )

    @staticmethod
    def get_myself(db,token):
        """ Get 'myself' info """
        
        # Return unauthorized error
        if not token:
            return Res(
                Status.UNAUTHORIZED,
                message=Message.UNAUTHORIZED
            )

        try:
            # Decode token
            data = decode_token(token)
        except:
            # Return unauthorized error
            return Res(
                Status.UNAUTHORIZED,
                message=Message.UNAUTHORIZED
            )

        try:
            # Find user using its id
            users = db.sql_query(
                SQL.USER_SELECT_ID,
                (data.get("user_id"),)
            )
        except Exception as error:
            # Return db error
            return Res(
                Status.ERROR,
                message=str(error)
            )

        # Return user not found
        if len(users) == 0:
            return Res(
                Status.BAD_REQ,
                message=Message.NO_USER
            )

        # Return user
        return Res(
            Status.OK,
            message=Message.USER_FOUND,
            data=User(users[0]).to_map()
        )

    @staticmethod 
    def refresh_token(token):
        """ Refresh auth token """

        try:
            # Decode auth token
            data = decode_token(token)
        except Exception as error:
            # Return unauthorized
            return Res(
                Status.UNAUTHORIZED,
                message=Message.UNAUTHORIZED
            )

        # Return new token
        return Res(
            Status.OK,
            message=Message.TOKENIZE,
            data={'token': encode_token(data.get('user_id')) }
        )




        
        