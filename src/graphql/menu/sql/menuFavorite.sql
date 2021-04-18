select
  "user".id
from
  "user"
  join user_x_favorite_menu on user_x_favorite_menu.user_id = $1
  join menu on user_x_favorite_menu.menu_id = menu.id
