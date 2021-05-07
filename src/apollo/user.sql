SELECT *
FROM "user"
WHERE id = $1
  AND is_unregistered = false
  AND valid_authentication_date <= $2;