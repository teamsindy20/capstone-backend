SELECT id
FROM store
WHERE id = ANY($1);