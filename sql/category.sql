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