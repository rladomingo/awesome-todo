
class SQL:

    USER_REGISTER = 'INSERT INTO user (username,email,password) VALUES (?,?,?)'
    USER_SELECT_ID = "SELECT * FROM user WHERE user_id = ?"
    USER_SELECT_USERNAME = "SELECT * FROM user WHERE username = ?"
    USER_SELECT_EMAIL = "SELECT * FROM user WHERE email = ?"