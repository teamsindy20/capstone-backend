SELECT hashtag.name
FROM menu_x_hashtag
  JOIN hashtag ON menu_x_hashtag.menu_id = $1
  AND menu_x_hashtag.hashtag_id = hashtag.id;