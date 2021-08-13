SELECT
  %I
FROM
  store
  JOIN store_x_hashtag ON store.id = store_x_hashtag.store_id
    AND store_x_hashtag.hashtag_id = (
      SELECT
        id
      FROM
        hashtag
    WHERE
      name = $1);

