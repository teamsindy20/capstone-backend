UPDATE "user"
SET modification_date = NOW(),
  valid_authentication_date = NOW()
WHERE email = $1
  AND is_unregistered = false
RETURNING id,
  password_hash_hash;