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