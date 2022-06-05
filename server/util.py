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

def group_by_completed(results, key):
    res = {
        'not_completed': [],
        'completed': []
    }
    for result in results:
        completed = result.get('completed')
        if completed == 0:
            res["not_completed"].append(result)
        elif completed == 1:
            res["completed"].append(result)
    return res

def group_by_completed(results):
    res = {
        'not_completed': [],
        'completed': [],
    }
    for result in results:

        if result.get('completed') != 0:
            res['completed'].append(result)
        else:
            res['not_completed'].append(result)

    return res

def group_by_day(results):

    res = {
    }

    for result in results:
        if result.get('due_date') is not None:
            due_date = str(result.get('due_date'))
            if res.get(due_date) is None:
                res[due_date] = []
            res[due_date].append(result)


    return res

def get_month(key):
    if key== 1:
        return "january"
    elif key == 2:
        return "february"
    elif key == 3:
        return "march"
    elif key == 4:
        return "april"
    elif key == 5:
        return "may"
    elif key == 6:
        return "june"
    elif key == 7:
        return "july"
    elif key == 8:
        return "august"
    elif key == 9:
        return "september"
    elif key == 10:
        return "october"
    elif key == 11:
        return "november"
    elif key == 12:
        return "december"

def group_by_month(results):

    res = {
        'january': [],
        'february': [],
        'march': [],
        'april': [],
        'may': [],
        'june': [],
        'july': [],
        'august': [],
        'september': [],
        'october': [],
        'november': [],
        'december': [],
    }
    for result in results:
        if result.get('month') is not None:
            res[get_month(result.get('month'))].append(result)

    
    return {k: v for k, v in res.items() if v}
