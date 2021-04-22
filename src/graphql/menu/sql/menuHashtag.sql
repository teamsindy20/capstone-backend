SELECT hashtag.name
FROM menu
  JOIN menu_x_hashtag ON menu_x_hashtag.menu_id = $1
  JOIN hashtag ON menu_x_hashtag.hashtag_id = hashtag.id