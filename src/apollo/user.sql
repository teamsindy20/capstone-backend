SELECT *
FROM "user"
WHERE id = $1
  AND is_unregistered = false
  AND $2 >= valid_authentication_date;