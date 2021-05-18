SELECT menu_id
FROM user_x_favorite_store
WHERE user_x_favorite_store.user_id = $1
  AND user_x_favorite_store.menu_id = $2;