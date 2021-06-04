SELECT %s
FROM menu_option_category
  JOIN menu_x_menu_option_category ON menu_option_category.id = menu_x_menu_option_category.menu_option_category_id
  AND menu_x_menu_option_category.menu_id = $1;