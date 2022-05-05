-- Add categories for Juan Dela Cruz
INSERT INTO category (
    name,
    user_id
) VALUES (
    'Category 1',
    1
);
INSERT INTO category (
    name,
    user_id
) VALUES (
    'Category 2',
    1
);
INSERT INTO category (
    name,
    user_id
) VALUES (
    'Category 3',
    1
);


-- Edit category 'Category 1' name owned by Juan Dela Cruz
UPDATE category
SET name = 'my category'
WHERE user_id = 1 AND cat_id = 1;

-- Delete category 'Category 3' owned by Juan Dela Cruz
DELETE FROM Category
WHERE user_id = 1 AND cat_id = 3;

-- View category 'Category 1' owned by Juan Dela Cruz
SELECT name, num_of_task FROM category
WHERE user_id = 1 AND cat_id = 1;

-- View all categories owned by Juan Dela Cruz
SELECT name, num_of_task FROM category
WHERE user_id = 1;