-- Name: Calma, Divino, Domingo
-- Section: S4L
-- Milestone 3: SQL Queries


-- Begin seed
DROP DATABASE IF EXISTS awesome_todo;

-- Create application database
CREATE DATABASE awesome_todo;

-- Use application database
USE awesome_todo;

-- Create user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT, 
    username VARCHAR(64) NOT NULL,
    email  VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    CONSTRAINT user_userid_pk PRIMARY KEY(user_id),
    CONSTRAINT user_username_uk UNIQUE(username),
    CONSTRAINT user_email_uk UNIQUE(email)
);

-- Create category table
CREATE TABLE category (
    cat_id INT AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    date_created DATE DEFAULT NOW(),
    user_id INT NOT NULL,
    CONSTRAINT category_catid_pk PRIMARY KEY(cat_id),
    CONSTRAINT category_userid_fk 
        FOREIGN KEY(user_id) REFERENCES user(user_id)
        ON DELETE CASCADE
);

-- Create task table
CREATE TABLE task (
    task_id INT AUTO_INCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT 0,
    due_date DATE,
    user_id INT NOT NULL,
    cat_id INT,
    CONSTRAINT task_taskid_pk PRIMARY KEY(task_id), 
    CONSTRAINT task_userid_fk FOREIGN KEY(user_id) REFERENCES user(user_id),
    CONSTRAINT task_catid_fk 
        FOREIGN KEY(cat_id) REFERENCES category(cat_id)
        ON DELETE CASCADE
);

-- Create a category summary view
CREATE VIEW category_summary (
    name,
    num_of_task,
    user_id
) AS SELECT 
    name,
    (SELECT COUNT(*) FROM task t WHERE t.task_id = task_id),
    user_id
FROM category;

-- Register a new user
INSERT INTO user (
    username,
    email,
    password
) VALUES (
    'ted.mosby',
    'ted.mosby@himym.com',
    'BeatenByAGoat3!_%'
);

-- Sign in an existing user. 
-- This query will be used in the backend to validate request object.
-- There are two possible scenario. First, user will only sent a username index.
-- Second, user can opt to use email index.
-- In this case, the user will sign in using the username.
SELECT COUNT(*) FROM user 
WHERE (username = 'ted.mosby' OR email = NULL)
AND password =  'BeatenByAGoat3!_%';

-- Create new category owned by an existing user
INSERT INTO category (
    name, 
    user_id
) VALUES (
    'Mosbius Design Task', 
    1
);

-- Read all categories owned by an existing user
SELECT * FROM category_summary WHERE user_id = 1;

-- Update an existing category owned by an existing user
UPDATE category SET name = 'Mosbius Design 2.0' 
WHERE cat_id = 1 AND user_id = 1;

-- Delete an existing category owned by an existing user permanently
DELETE FROM category WHERE cat_id = 1 AND user_id = 1;

-- Create new task owned by an existing user
INSERT INTO task (
    title, 
    user_id
) VALUES (
    'Create mockups for Company A', 
    1
);

-- Read all tasks owned by an existing user.
-- Reading all tasks means regardless of due date, completed status, etc.
-- The result will be consumed by what the frontend needs.
SELECT title, completed 
FROM task 
WHERE user_id = 1 
ORDER BY completed ASC;

-- Read all tasks owned by existing user filtered by day
-- A day refers to the weekday of the week. 0 is Monday, 6 is Sunday.
SELECT 
    title, 
    completed, 
    WEEKDAY(due_date) AS day 
FROM task 
WHERE user_id = 1
ORDER BY completed ASC, due_date ASC;

-- Read all tasks owned by existing user filtered by month
-- 1 is January, 12 is December.
SELECT 
    title, 
    completed, 
    MONTH(due_date) AS month 
FROM task 
WHERE user_id = 1
ORDER BY completed ASC, due_date ASC;

-- Read the details of an existing task owned by an existing user.
-- Used for the detail page in the application.
SELECT title,description, due_date, cat_id 
FROM task WHERE task_id = 1 AND user_id = 1;

-- Read all tasks owned by an existing user by category.
SELECT title, completed 
FROM task 
WHERE user_id = 1 AND cat_id = 1
ORDER BY completed ASC;

-- Read all tasks owned by existing user by category filtered by day
-- A day refers to the weekday of the week. 0 is Monday, 6 is Sunday.
SELECT 
    title, 
    completed, 
    WEEKDAY(due_date) AS day 
FROM task 
WHERE user_id = 1 AND cat_id = 1 
ORDER BY completed ASC, due_date ASC;

-- Read all tasks owned by existing user by category filtered by month
-- 1 is January, 12 is December.
SELECT 
    title, 
    completed, 
    MONTH(due_date) AS month 
FROM task 
WHERE user_id = 1 AND cat_id = 1 
ORDER BY completed ASC, due_date ASC;

-- Update the details of an existing task owned by an existing user.
UPDATE task SET 
    description = 'For checking by Admin', 
    due_date = '2022-05-12', 
    cat_id = 1 
WHERE task_id = 1 AND user_id = 1;

-- Update the completed status of an existing task owned by an exiting user.
-- Aka Mark as done and vice versa.
UPDATE task SET completed = 1 WHERE task_id = 1 and user_id = 1; 

-- Delete an existing task permanently.
DELETE FROM task WHERE task_id = 1 AND user_id = 1;