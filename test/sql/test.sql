SELECT menu_x_menu_option_category.menu_id,
  menu_option_category.id,
  menu_option_category.name,
  menu_option.id,
  menu_option.price
FROM menu_x_menu_option_category
  JOIN menu_option_category ON menu_x_menu_option_category.menu_option_category_id = menu_option_category.id
  AND menu_x_menu_option_category.menu_id = 1
  JOIN menu_option ON menu_option_category.id = menu_option.category_id;

SELECT id,
  name
FROM menu
WHERE id = 1;