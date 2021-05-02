SELECT menu_id
FROM user_x_favorite_menu
WHERE user_x_favorite_menu.user_id = $1
  AND user_x_favorite_menu.menu_id = $2;