-- Register Juan Dela Cruz as new user
INSERT INTO user (
    username,
    email,
    password
) VALUES (
    'juan.delacruz',
    'juan@delacruz.com',
    'p@as5w0rD'
);

-- Register Maya Pula as new user
INSERT INTO user (
    username,
    email,
    password
) VALUES (
    'maya.pula',
    'maya@pula.io',
    'p@as5w0rD'
);

-- Get user info of Juan Dela Cruz
SELECT user_id, username, email
FROM user WHERE username = 'juan.delacruz';


-- Get user info of Maya Pula
SELECT user_id, username, email
FROM user WHERE username = 'maya.pula';