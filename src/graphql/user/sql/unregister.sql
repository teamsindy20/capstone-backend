update
  "user"
set
  modification_date = now(),
  point = 0,
  is_unregistered = true,
  password_hash_hash = '',
  image_url = '',
  name = '',
  phone_number = ''
where
  id = $1;

