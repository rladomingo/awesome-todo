from util import Status, Response, GenericMessage, encode_token, decode_token

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

        return Response(
            Status.OK,
            message=GenericMessage.SERVER_OK,
            data="pong"
        ).to_map()

    @staticmethod 
    def register(db,username,email,password):
        """ Register a new user """

        # Validate request body 
        if not username or not email or not password:
            return Response(
                Status.ERROR,
                message="Invalid user credentials!"
            ).to_map()
  
        try:
            # Create a new user
            res = db.sql_query(
                'INSERT INTO user (username,email,password) VALUES (?,?,?)',
                (username,email,password),
                commit=True
            )
            return Response(
                Status.OK,
                message="Successfully registered a user!",
                data=res
            ).to_map()
        except Exception as error:
            # Handle db error 
            # Such as: user should not be able to register if existing
            return Response(
                Status.ERROR,
                message=str(error),
            ).to_map()

    @staticmethod
    def login(db,username,email,password,check_pw):
        """ Login an existing user """

        # Validate indexes availability
        if not username and not email:
            return Response(
                Status.ERROR,
                message="Invalid username/email!"
            ).to_map()

        # Validate password availability
        if not password:
            return Response(
                Status.ERROR,
                message="No password found!"
            ).to_map()

        # Choose an index to query
        query_string = None 
        arg = None 
        if username and not email:
            query_string = "SELECT * FROM user WHERE username = ?"
            arg = username
        elif email and not username:
            query_string = "SELECT * FROM user WHERE email = ?"
            arg = email

        try:
            # Find the user
            users = db.sql_query(
                query_string,
                (arg,)
            )
        except Exception as error:
            # Handle db error
            # Such as: tried to query a user that does not exist
            return Response(
                Status.ERROR,
                message=str(error)
            )

        # Error if user not found
        if len(users) == 0:
            return Response(
                Status.ERROR,
                message="No user found!"
            ).to_map()

        user = User(users[0])
        # Error if incorrect password
        if not check_pw(user.password,password):
            return Response(
                Status.ERROR,
                message="Invalid password!"
            ).to_map()

        # Return auth token
        return Response(
            Status.OK,
            message="Successfuly logged in!",
            data={
                'token': encode_token(user.user_id)
            }
        ).to_map()

    @staticmethod
    def get_myself(db,token):
        """ Get 'myself' info """
        
        # Error if no token
        if not token:
            return Response(
                Status.ERROR,
                message=GenericMessage.NOT_AUTH
            ).to_map()

        try:
            # Decode token
            data = decode_token(token)
        except:
            # Error if token expired
            return Response(
                Status.ERROR,
                message=GenericMessage.NOT_AUTH
            ).to_map()

        try:
            # Find user
            users = db.sql_query(
                "SELECT * FROM user WHERE user_id = ?",
                (data.get("user_id"),)
            )
        except Exception as error:
            # Hnandle db error
            return Response(
                Status.ERROR,
                message=str(error)
            ).to_map()

        # Error if no user found
        if len(users) == 0:
            return Response(
                Status.ERROR,
                message="No user found!"
            ).to_map()

        # Return user info
        return Response(
            Status.OK,
            message="Successfully found a user!",
            data={
                'user': User(users[0]).to_map()
            }
        ).to_map()

    @staticmethod 
    def refresh_token(token):
        """ Refresh auth token """

        # Validate authentication
        try:
            data = decode_token(token)
        except Exception as error:
            return Response(
                Status.ERROR,
                message=GenericMessage.NOT_AUTH
            ).to_map()

        # Return new token
        return Response(
            Status.OK,
            message="Here is your new token!",
            data={
                'token': encode_token(data.get('user_id'))
            }
        ).to_map()




        
        