SELECT id,
  price,
  category_id,
  store_id
FROM menu
  JOIN menu_x_menu_option_category ON menu_x_menu_option_category.menu_id = menu.id
  AND menu_x_menu_option_category.id = ANY($1);