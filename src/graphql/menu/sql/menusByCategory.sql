WITH category_id AS (
  SELECT id
  FROM menu_category
  WHERE name = $1
)
SELECT *
FROM menu
  JOIN category_id ON menu.category_id = category_id.id;