
class SQL:

    USER_REGISTER = 'INSERT INTO user (username,email,password) VALUES (?,?,?)'
    USER_SELECT_ID = "SELECT * FROM user WHERE user_id = ?"
    USER_SELECT_USERNAME = "SELECT * FROM user WHERE username = ?"
    USER_SELECT_EMAIL = "SELECT * FROM user WHERE email = ?"

    ADD_TASK = 'INSERT INTO task (title,description,due_date,user_id) VALUES (?,?,?,?)'
    EDIT_TASK = 'UPDATE task SET title = ?, description = ?, due_date = ? WHERE user_id = ? AND task_id = ?'
    DELETE_TASK = 'DELETE FROM task WHERE user_id = ? AND task_id = ?'
    VIEW_ALL_TASK = 'SELECT * FROM task WHERE user_id = ?'
    MARK_TASK = 'UPDATE task SET completed = 1 WHERE user_id = ? AND task_id = ?'
    ADD_TASK_CATEGORY = 'UPDATE task SET cat_id = ? WHERE (SELECT COUNT(c.cat_id) FROM category c WHERE cat_id = ?) = 1 AND user_id = ? AND task_id = ?'
    VIEW_TASK_PER_DAY = 'SELECT * FROM task WHERE user_id = ? HAVING WEEKDAY(due_date) = ?'
    VIEW_TASK_PER_MONTH = 'SELECT * FROM task WHERE user_id = ? HAVING MONTH(due_date) = ?'

    ADD_CATEGORY = 'INSERT INTO category (name,user_id) VALUES (?,?)'
    EDIT_CATEGORY = 'UPDATE category SET name = ? WHERE user_id = ? AND cat_id = ?'
    DELETE_CATEGORY = 'DELETE FROM category WHERE user_id = ? AND cat_id = ?'
    VIEW_CATEGORY = 'SELECT name, (SELECT COUNT(*) FROM task WHERE user_id = ? AND cat_id = ?) as num_of_task FROM category WHERE user_id = ? AND cat_id = ?'
    VIEW_ALL_CATEGORY = 'SELECT name, (SELECT COUNT(*) FROM task t WHERE user_id = ? AND c.cat_id = t.cat_id) as num_of_task FROM category c WHERE user_id = ?;'