-- Begin seed
DROP DATABASE awesome_todo;

-- Create application database
CREATE DATABASE awesome_todo;

-- Use application database
USE awesome_todo;

-- Create user table
CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(64) UNIQUE NOT NULL,
    email  VARCHAR(256) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
);

-- Create category table
CREATE TABLE category (
    cat_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    num_of_task INT NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    CONSTRAINT cat_user_fk FOREIGN KEY(user_id) REFERENCES user(user_id)
);

-- Create task table
CREATE TABLE task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT 0,
    due_date DATE,
    user_id INT NOT NULL,
    cat_id INT,
    CONSTRAINT task_user_fk FOREIGN KEY(user_id) REFERENCES user(user_id),
    CONSTRAINT task_cat_fk FOREIGN KEY(cat_id) REFERENCES category(cat_id)
);

