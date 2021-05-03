DROP TABLE IF EXISTS "user" CASCADE;

-- valid_authentication_date 이후의 JWT 토큰만 유효함
CREATE TABLE "user" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  valid_authentication_date timestamptz NOT NULL DEFAULT NOW(),
  point int NOT NULL DEFAULT 0,
  is_unregistered boolean NOT NULL DEFAULT FALSE,
  --
  email varchar(64) NOT NULL UNIQUE,
  password_hash_hash varchar(128) NOT NULL,
  --
  name varchar(64),
  phone_number varchar(16),
  gender varchar(16),
  birth_date timestamptz,
  image_urls text ARRAY,
  delivery_addresses varchar(64) ARRAY
);

DROP TABLE IF EXISTS store CASCADE;

CREATE TABLE store (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  name varchar(64) NOT NULL,
  address varchar(64) NOT NULL,
  delivery_fee int NOT NULL DEFAULT 0,
  minimum_delivery_amount int NOT NULL DEFAULT 0,
  delicious_review_count int NOT NULL DEFAULT 0,
  fine_review_count int NOT NULL DEFAULT 0,
  bad_review_count int NOT NULL DEFAULT 0,
  new_order_count int NOT NULL DEFAULT 0,
  reorder_count int NOT NULL DEFAULT 0,
  new_customer_count int NOT NULL DEFAULT 0,
  regular_customer_count int NOT NULL DEFAULT 0,
  favorite_count int NOT NULL DEFAULT 0,
  click_count int NOT NULL DEFAULT 0,
  post_count int NOT NULL DEFAULT 0,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  --
  review_event_content text,
  regular_customer_event_content text,
  delivery_time_min int,
  delivery_time_max int,
  image_urls text ARRAY
);

DROP TABLE IF EXISTS menu_category CASCADE;

CREATE TABLE menu_category (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) UNIQUE NOT NULL,
  menu_category_id bigint REFERENCES menu_category ON DELETE CASCADE
);

DROP TABLE IF EXISTS menu_theme CASCADE;

CREATE TABLE menu_theme (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS menu CASCADE;

CREATE TABLE menu (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  delicious_review_count int NOT NULL DEFAULT 0,
  fine_review_count int NOT NULL DEFAULT 0,
  bad_review_count int NOT NULL DEFAULT 0,
  new_order_count int NOT NULL DEFAULT 0,
  reorder_count int NOT NULL DEFAULT 0,
  new_customer_count int NOT NULL DEFAULT 0,
  regular_customer_count int NOT NULL DEFAULT 0,
  favorite_count int NOT NULL DEFAULT 0,
  click_count int NOT NULL DEFAULT 0,
  store_post_count int NOT NULL DEFAULT 0,
  is_discounted boolean NOT NULL DEFAULT FALSE,
  can_be_picked boolean NOT NULL DEFAULT FALSE,
  can_be_reserved boolean NOT NULL DEFAULT FALSE,
  --
  name varchar(64) NOT NULL,
  price int NOT NULL,
  --
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  category_id bigint NOT NULL REFERENCES menu_category ON DELETE CASCADE,
  --
  image_urls text ARRAY,
  --
  theme_id bigint REFERENCES menu_theme ON DELETE CASCADE
);

DROP INDEX IF EXISTS menu_store_id CASCADE;

CREATE INDEX menu_store_id ON menu (store_id);

DROP INDEX IF EXISTS menu_category_id CASCADE;

CREATE INDEX menu_category_id ON menu (category_id);

DROP INDEX IF EXISTS menu_theme_id CASCADE;

CREATE INDEX menu_theme_id ON menu (theme_id);

DROP TABLE IF EXISTS menu_option_category CASCADE;

-- type은 '단일선택형', '다중선택형', '서술형'
CREATE TABLE menu_option_category (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  is_necessary boolean NOT NULL DEFAULT false,
  --
  name varchar(32) NOT NULL,
  TYPE varchar(16) NOT NULL,
  --
  menu_id bigint NOT NULL REFERENCES menu ON DELETE CASCADE,
  --
  minimum_selection_count int,
  maximum_selection_count int
);

DROP TABLE IF EXISTS menu_option CASCADE;

CREATE TABLE menu_option (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  price int NOT NULL DEFAULT 0,
  --
  name varchar(32) NOT NULL,
  --
  category_id bigint NOT NULL REFERENCES menu_option_category ON DELETE CASCADE
);

DROP TABLE IF EXISTS payment CASCADE;

CREATE TABLE payment (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS "order" CASCADE;

CREATE TABLE "order" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  order_status varchar(16) NOT NULL DEFAULT '접수 대기',
  review_reward boolean NOT NULL DEFAULT false,
  regular_reward boolean NOT NULL DEFAULT false,
  point_used int NOT NULL DEFAULT 0,
  --
  menu_total int NOT NULL,
  delivery_charge int NOT NULL,
  delivery_address varchar(64) NOT NULL,
  payment_date timestamptz NOT NULL,
  --
  payment_id bigint NOT NULL REFERENCES payment ON DELETE CASCADE,
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  delivery_request varchar(256),
  store_request varchar(256)
);

DROP TABLE IF EXISTS coupon CASCADE;

-- user_id 또는 store_id 가 존재해야 한다. 둘 다 없으면 안 된다.
CREATE TABLE coupon (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL,
  operation varchar(16) NOT NULL,
  discount_amount int NOT NULL,
  minimum_order_amount int NOT NULL,
  --
  user_id bigint REFERENCES menu ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE
);

DROP TABLE IF EXISTS promotion CASCADE;

CREATE TABLE promotion (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL,
  operattion varchar(16) NOT NULL,
  discount_amount int NOT NULL,
  --
  order_id bigint REFERENCES menu ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE
);

DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  helping_others_count int NOT NULL DEFAULT 0,
  --
  rating varchar(16) NOT NULL,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  order_id bigint NOT NULL REFERENCES "order" ON DELETE CASCADE,
  --
  image_urls text ARRAY,
  good_point_content text,
  desired_point_content text
);

DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE post (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  like_count int NOT NULL DEFAULT 0,
  comment_count int NOT NULL DEFAULT 0,
  --
  content text NOT NULL,
  --
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  image_urls text ARRAY
);

DROP TABLE IF EXISTS hashtag CASCADE;

CREATE TABLE hashtag (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL UNIQUE
);

DROP INDEX IF EXISTS hashtag_name CASCADE;

CREATE UNIQUE INDEX hashtag_name ON hashtag (name);

DROP TABLE IF EXISTS user_x_favorite_store;

CREATE TABLE user_x_favorite_store (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, store_id)
);

DROP TABLE IF EXISTS user_x_regular_store;

CREATE TABLE user_x_regular_store (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  date_limit_for_regular timestamptz NOT NULL,
  order_count_for_regular int NOT NULL,
  --
  regular_maintenance_date timestamptz,
  --
  PRIMARY KEY (user_id, store_id)
);

DROP TABLE IF EXISTS user_x_favorite_menu;

CREATE TABLE user_x_favorite_menu (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  menu_id bigint REFERENCES menu ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, menu_id)
);

DROP TABLE IF EXISTS user_x_hashtag;

CREATE TABLE user_x_hashtag (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  hashtag_id bigint REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, hashtag_id)
);

DROP TABLE IF EXISTS store_x_hashtag;

CREATE TABLE store_x_hashtag (
  store_id bigint REFERENCES store ON DELETE CASCADE,
  hashtag_id bigint REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (store_id, hashtag_id)
);

DROP TABLE IF EXISTS menu_x_review;

CREATE TABLE menu_x_review (
  menu_id bigint REFERENCES menu ON DELETE CASCADE,
  review_id bigint REFERENCES review ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, review_id)
);

DROP TABLE IF EXISTS menu_x_hashtag;

CREATE TABLE menu_x_hashtag (
  menu_id bigint REFERENCES menu,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, hashtag_id)
);

DROP TABLE IF EXISTS menu_x_order;

CREATE TABLE menu_x_order (
  menu_id bigint REFERENCES menu,
  order_id bigint REFERENCES "order",
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, order_id)
);

DROP TABLE IF EXISTS review_x_hashtag;

CREATE TABLE review_x_hashtag (
  review_id bigint REFERENCES review,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (review_id, hashtag_id)
);

DROP TABLE IF EXISTS post_x_hashtag;

CREATE TABLE post_x_hashtag (
  post_id bigint REFERENCES post,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (post_id, hashtag_id)
);