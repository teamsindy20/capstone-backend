SELECT "user".id
FROM "user"
  JOIN user_x_favorite_menu ON "user".id = $1
  AND user_x_favorite_menu.user_id = $1
  JOIN menu ON user_x_favorite_menu.menu_id = menu.id;