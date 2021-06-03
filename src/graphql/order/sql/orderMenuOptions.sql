SELECT price,
  category_id
FROM menu_option
WHERE id = ANY($1);