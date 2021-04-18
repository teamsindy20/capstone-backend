select
  image_url.url
from
  menu
  join menu_x_image_url on menu_x_image_url.menu_id = $1
  join image_url on menu_x_image_url.image_url_id = image_url.id
