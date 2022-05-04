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
    num_of_task INT NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    CONSTRAINT category_catid_pk PRIMARY KEY(cat_id),
    CONSTRAINT cat_userd_fk FOREIGN KEY(user_id) REFERENCES user(user_id)
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
    CONSTRAINT task_catid_fk FOREIGN KEY(cat_id) REFERENCES category(cat_id)
);

