SELECT
  menu_x_menu_option_category.menu_id,
  menu_option_category.id AS menu_option_category_id,
  menu_option.id AS menu_option_id,
  menu_option.price AS menu_option_price
FROM
  menu_x_menu_option_category
  JOIN menu_option_category ON menu_x_menu_option_category.menu_id = ANY ($1)
    AND menu_x_menu_option_category.menu_option_category_id = menu_option_category.id
  JOIN menu_option ON menu_option_category.id = menu_option.category_id;

