SELECT
  store_id
FROM
  user_x_regular_store
WHERE
  user_x_regular_store.user_id = $1
  AND user_x_regular_store.store_id = $2;

