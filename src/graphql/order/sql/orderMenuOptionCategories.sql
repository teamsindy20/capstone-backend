SELECT "type",
  is_necessary,
  store_id,
  minimum_selection_count,
  maximum_selection_count
FROM menu_option_category
WHERE id = ANY($1);