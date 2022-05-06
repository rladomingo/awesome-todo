-- Insert tasks for Juan Dela Cruz
INSERT INTO task (
    title,
    due_date,
    user_id
) VALUES (
    'This task should be done by June 1, 2022',
    '2022-06-01',
    1
);
INSERT INTO task (
    title,
    due_date,
    user_id
) VALUES (
    'This task should be done by June 4, 2022',
    '2022-06-04',
    1
);
INSERT INTO task (
    title,
    user_id
) VALUES (
    'This task has no due date',
    1
);
INSERT INTO task (
    title,
    description,
    user_id
) VALUES (
    'This task has a title',
    'This task has a description',
    1
);


-- Update task to have a due date owned by Juan Dela Cruz
UPDATE task 
SET due_date = '2022-06-07'
WHERE user_id = 1 AND task_id = 4;

-- Update task to have a description owned by Juan Dela Cruz
UPDATE task 
SET description = 'Blah blah'
WHERE user_id = 1 AND task_id = 1;

-- Delete a task owned by Juan Dela Cruz
DELETE FROM task 
WHERE user_id = 1 AND task_id = 2;

-- View all Juan Dela Cruz's tasks
SELECT * FROM task WHERE user_id = 1;

-- Mark task as done owned by Juan Dela Cruz
UPDATE task 
SET completed = 1
WHERE user_id = 1 AND task_id = 3;

-- Add task owned by Juan Dela Cruz to a category
UPDATE task
SET cat_id = 2
WHERE user_id = 1 AND task_id = 1;

-- View task all tasks owned by Juan Dela Cruz due for June
SELECT * FROM task 
WHERE user_id = 1 
HAVING MONTH(due_date) = 6;


-- View task all tasks owned by Juan Dela Cruz due for Monday
SELECT * FROM task 
WHERE user_id = 1 
HAVING WEEKDAY(due_date) = 1;