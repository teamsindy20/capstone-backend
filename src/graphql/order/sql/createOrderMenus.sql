INSERT INTO order_x_selected_menu (order_id, menu_id, "count")
VALUES ($1, $2, $3)
RETURNING id;