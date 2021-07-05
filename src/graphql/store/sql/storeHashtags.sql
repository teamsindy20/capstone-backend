SELECT
  hashtag.name
FROM
  store_x_hashtag
  JOIN hashtag ON store_x_hashtag.store_id = $1
    AND store_x_hashtag.hashtag_id = hashtag.id;

