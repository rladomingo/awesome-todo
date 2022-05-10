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