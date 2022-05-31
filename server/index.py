from flask import Flask, request, jsonify
from dotenv import dotenv_values
from db import Database
from rest import Rest
from flask_cors import CORS
import bcrypt
from util import *

env = dotenv_values(".env")
app = Flask(__name__)
app.config["APPLICATION_ROOT"] = "/api/v1"
cors = CORS(
    app,
    origins=['http://localhost:3000'],
)

db = Database(
    env.get("USERNAME"),
    env.get("PASSWORD"),
    env.get("DATABASE"),
    env.get("PORT")
)



""" START OF USERS API ENDPOINT  """

user_rest = Rest(db,crud={
    'create': 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
    'retrieve': 'SELECT user_id, username, email FROM user',
    'update': 'UPDATE user SET email = ? WHERE user_id = ?',
    'delete': 'DELETE FROM user WHERE user_id = ?'
})

@app.post('/user')
def create_user():
    """ create new user """

    try:
        user_id = user_rest.create((
            request.json.get('username'),
            request.json.get('email'),
            request.json.get('password'),
        ), middleware=hash_password)
        user = filter_one(
            user_rest.retrieve(None),
            'user_id',
            user_id
        )
        return jsonify({
            'status': 'success',
            'data': user
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.get('/user')
def retrieve_users():
    """ return all users """

    return jsonify({
        'status': 'success',
        'data': user_rest.retrieve(None),
    })

@app.get('/user/<int:user_id>')
def retrieve_user(user_id):
    """ return a single user """ 

    result = filter_one(
        user_rest.retrieve(None), 
        'user_id',
        user_id,
    )
    return jsonify({
        'status': 'success',
        'data': result,
    })


@app.put('/user/<int:user_id>')
def update_user(user_id):
    """ update a single user """

    try:
        user_rest.update((request.json.get('email'), user_id))
        user = filter_one(user_rest.retrieve(None), 'user_id',user_id)
        return  jsonify({
            'status': 'success',
            'data': user
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })



@app.delete('/user/<int:user_id>')
def delete_user(user_id):
    """ delete a single user """

    try:
        user_rest.delete((user_id,))
        return  jsonify({
            'status': 'success',
            'data': True
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.post('/user/sign-in')
def sign_in():
    """ sign in existing user """

    try:
        user = filter_one(
            user_rest.custom('SELECT * FROM user'),
            'username',
            request.json.get('username'),
        )
        if not user or not bcrypt.checkpw(
            request.json.get('password').encode('utf-8'),
            user.get('password').encode('utf-8')
        ):
            raise Exception('invalid username/password')
        return jsonify({
            'status': 'success',
            'data': {
                'token': generate_token({
                    'user_id': user.get('user_id')
                })
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })



""" END OF USERS API ENDPOINT """

""" START OF CATEGORY API ENDPOINT  """

category_rest = Rest(db, crud={
    'create': 'INSERT INTO category (name, user_id) VALUES (?, ?)',
    'retrieve': 'SELECT * FROM category',
    'update': 'UPDATE category SET name = ? WHERE cat_id = ?',
    'delete': 'DELETE FROM category WHERE cat_id = ?'
})

@app.get('/category')
def retrieve_categories():
    """ retrieve all categories """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        result = filter_results(
            category_rest.retrieve(None),
            "user_id",
            user.get('user_id')
        )
        
        return jsonify({
            'status': 'success',
            'data': result
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.get('/category/<int:cat_id>')
def retrieve_category(cat_id):
    """ retrieve single category """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        result = filter_results(
            category_rest.retrieve(None),
            "user_id",
            user.get('user_id')
        )
        
        return jsonify({
            'status': 'success',
            'data': filter_one(result,'cat_id',cat_id)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.post('/category')
def create_category():
    """ create new category """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        cat_id = category_rest.create((request.json.get('name'), user.get('user_id')))
        res = filter_one(category_rest.retrieve(None), 'cat_id', cat_id)
        
        return jsonify({
            'status': 'success',
            'data': res
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.put('/category/<int:cat_id>')
def update_category(cat_id):
    """ update existing category """

    try:
        token = get_token(request.headers)
        decode_token(token)
        category_rest.update((request.json.get('name'), cat_id))
        res = filter_one(category_rest.retrieve(None), 'cat_id', cat_id)
        
        return jsonify({
            'status': 'success',
            'data': res
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.delete('/category/<int:cat_id>')
def delete_category(cat_id):
    """ delete existing category """

    try:
        token = get_token(request.headers)
        decode_token(token)
        category_rest.delete((cat_id,))
        
        return jsonify({
            'status': 'success',
            'data': True
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

""" END OF CATEGORY API ENDPOINT """

""" START OF TASKS API ENDPOINT  """

task_rest = Rest(db, crud={
    'create': 'INSERT INTO task (title, description, due_date, user_id) VALUES (?, ?, ?, ?)',
    'retrieve': 'SELECT * FROM task',
    'update': '',
    'delete': 'DELETE FROM task WHERE task_id = ?'
})

@app.post('/task')
def create_task():
    """ create new task """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        task_id = task_rest.create((
            request.json.get('title'),
            request.json.get('description'),
            request.json.get('due_date'),
            user.get('user_id')))
        res = filter_one(task_rest.retrieve(None), 'task_id', task_id)
        
        return jsonify({
            'status': 'success',
            'data': res
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.get('/task')
def retrieve_tasks():
    """ retrieve all tasks """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        result = filter_results(
            task_rest.retrieve(None),
            "user_id",
            user.get('user_id')
        )
        
        return jsonify({
            'status': 'success',
            'data': result
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.get('/task/<int:task_id>')
def retrieve_task(task_id):
    """ retrieve single task """

    try:
        token = get_token(request.headers)
        user = decode_token(token)
        result = filter_results(
            task_rest.retrieve(None),
            "user_id",
            user.get('user_id')
        )
        
        return jsonify({
            'status': 'success',
            'data': filter_one(result,'task_id',task_id)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.delete('/task/<int:task_id>')
def delete_task(task_id):
    """ delete existing task """

    try:
        token = get_token(request.headers)
        decode_token(token)
        task_rest.delete((task_id,))
        
        return jsonify({
            'status': 'success',
            'data': True
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

""" END OF TASKS API ENDPOINT  """




if __name__ == "__main__":
    try:
        app.run(port=env.get("SERVER_PORT"), debug=True)
    except KeyboardInterrupt:
        db.close_connection()
