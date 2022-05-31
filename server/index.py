from flask import Flask, request, jsonify
from dotenv import dotenv_values
from db import Database
from rest import Rest
from flask_cors import CORS
import bcrypt
import jwt
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


user_rest = Rest(db,crud={
    'create': 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
    'retrieve': 'SELECT user_id, username, email FROM user',
    'update': 'UPDATE user SET email = ? WHERE user_id = ?',
    'delete': 'DELETE FROM user WHERE user_id = ?'
})

category_rest = Rest(db, crud={
    'create': 'INSERT INTO category (name, user_id) VALUES (?, ?)',
    'retrieve': 'SELECT * FROM category',
    'update': 'UPDATE category SET name = ? WHERE cat_id = ?',
    'delete': 'DELETE FROM category WHERE cat_id = ?'
})

""" START OF USERS API ENDPOINT  """

@app.post('/user')
def create_user():
    """ create new user """

    try:
        user_id = user_rest.create((
            request.json.get('username'),
            request.json.get('email'),
            request.json.get('password'),
        ), middleware=hash_password)
        user = filter_users(
            user_rest.retrieve(None),
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

    result = filter_users(
        user_rest.retrieve(None), 
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
        user = filter_users(user_rest.retrieve(None), user_id)
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
        user = filter_users(
            user_rest.custom('SELECT * FROM user'),
            request.json.get('username'),
            key="username"
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




if __name__ == "__main__":
    try:
        app.run(port=env.get("SERVER_PORT"), debug=True)
    except KeyboardInterrupt:
        db.close_connection()
