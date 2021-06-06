SELECT id,
  price,
  store_id
FROM menu
WHERE id = ANY($1);