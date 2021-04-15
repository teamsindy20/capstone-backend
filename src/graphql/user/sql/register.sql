insert into "user" (email, password_hash_hash, image_url, name, phone_number, gender, birth_date, address)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  id;

