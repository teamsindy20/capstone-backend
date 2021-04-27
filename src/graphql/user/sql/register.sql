INSERT INTO "user" (
    email,
    password_hash_hash,
    name,
    phone_number,
    gender,
    birth_date,
    image_urls,
    delivery_addresses
  )
VALUES ($1, $2, $3, $4, $5, $6, array [$7], array [$8])
RETURNING id;