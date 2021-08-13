SELECT
  %s
FROM
  menu
  JOIN order_x_selected_menu ON menu.id = order_x_selected_menu.menu_id
    AND order_id = $1;

