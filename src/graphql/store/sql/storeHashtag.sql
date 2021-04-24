SELECT hashtag.name
FROM store
  JOIN store_x_hashtag ON store.id = $1
  AND store_x_hashtag.store_id = $1
  JOIN hashtag ON store_x_hashtag.hashtag_id = hashtag.id;