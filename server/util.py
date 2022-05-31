import bcrypt
import jwt
from dotenv import dotenv_values

env = dotenv_values(".env")

def hash_password(values):
    hashed = bcrypt.hashpw(values[2].encode('utf-8'), bcrypt.gensalt())
    return (values[0], values[1], hashed)

def filter_users(users,value,  key="user_id"):
    for user in users:
        if user.get(key) == value:
            return user

def generate_token(payload):
    token = jwt.encode(payload, env.get("SECRET_KEY"), algorithm="HS256")
    return token