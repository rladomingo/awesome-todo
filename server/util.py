import bcrypt
import jwt
from dotenv import dotenv_values

env = dotenv_values(".env")

def hash_password(values):
    hashed = bcrypt.hashpw(values[2].encode('utf-8'), bcrypt.gensalt())
    return (values[0], values[1], hashed)

def generate_token(payload):
    token = jwt.encode(payload, env.get("SECRET_KEY"), algorithm="HS256")
    return token

def get_token(headers):
    header = headers.get('Authorization')
    if not header:
        raise Exception('invalid token/not authenticated')
    return header.split(" ")[1]

def decode_token(token):
    try:
        return jwt.decode(token, env.get("SECRET_KEY"), algorithms=["HS256"])
    except:
        raise Exception('invalid token/not authenticated')

def filter_one(results,key,value):
    for result in results:
        if result.get(key) == value:
            return result

def filter_results(results, key,value):
    res = []
    for result in results:
        if result.get(key) == value:
            res.append(result)
    return res
