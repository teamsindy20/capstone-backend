SELECT image_url.url
FROM menu
  JOIN menu_x_image_url ON menu_x_image_url.menu_id = $1
  JOIN image_url ON menu_x_image_url.image_url_id = image_url.id