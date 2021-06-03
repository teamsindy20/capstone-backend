WITH selected_menu_option AS (
  SELECT price,
    category_id
  FROM menu_option
  WHERE id = ANY ($1)
),
store_id AS (
  SELECT DISTINCT store_id
  FROM menu_option_category
  WHERE id IN (
      SELECT category_id
      FROM selected_menu_option
    )
)
SELECT *
FROM selected_menu_option