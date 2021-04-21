DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
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
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
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
  name varchar(64) NOT NULL,
  address varchar(64) NOT NULL,
  --
  review_event_content text,
  regular_customer_event_content text,
  delivery_time_min int,
  delivery_time_max int,
  image_urls text ARRAY
);

DROP TABLE IF EXISTS menu CASCADE;

CREATE TABLE menu (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
  category varchar(16) NOT NULL,
  --
  store_id int NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  image_urls text ARRAY
);

DROP TABLE IF EXISTS "order" CASCADE;

CREATE TABLE "order" (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  order_status varchar(16) NOT NULL DEFAULT '접수 대기',
  --
  order_total int NOT NULL,
  --
  user_id int NOT NULL REFERENCES "user" ON DELETE CASCADE,
  store_id int NOT NULL REFERENCES store ON DELETE CASCADE
);

DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  helping_others_count int NOT NULL DEFAULT 0,
  --
  rating varchar(16) NOT NULL,
  --
  user_id int NOT NULL REFERENCES "user" ON DELETE CASCADE,
  store_id int NOT NULL REFERENCES store ON DELETE CASCADE,
  order_id int NOT NULL REFERENCES "order" ON DELETE CASCADE,
  --
  image_urls text ARRAY,
  good_point_content text,
  desired_point_content text
);

DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE post (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  like_count int NOT NULL DEFAULT 0,
  comment_count int NOT NULL DEFAULT 0,
  --
  content text NOT NULL,
  --
  store_id int NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  image_urls text ARRAY
);

DROP TABLE IF EXISTS hashtag CASCADE;

CREATE TABLE hashtag (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS user_x_favorite_store;

CREATE TABLE user_x_favorite_store (
  user_id int REFERENCES "user" ON DELETE CASCADE,
  store_id int REFERENCES store ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, store_id)
);

DROP TABLE IF EXISTS user_x_regular_store;

CREATE TABLE user_x_regular_store (
  user_id int REFERENCES "user" ON DELETE CASCADE,
  store_id int REFERENCES store ON DELETE CASCADE,
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
  user_id int REFERENCES "user" ON DELETE CASCADE,
  menu_id int REFERENCES menu ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, menu_id)
);

DROP TABLE IF EXISTS user_x_hashtag;

CREATE TABLE user_x_hashtag (
  user_id int REFERENCES "user" ON DELETE CASCADE,
  hashtag_id int REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, hashtag_id)
);

DROP TABLE IF EXISTS store_x_hashtag;

CREATE TABLE store_x_hashtag (
  store_id int REFERENCES store ON DELETE CASCADE,
  hashtag_id int REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (store_id, hashtag_id)
);

DROP TABLE IF EXISTS menu_x_review;

CREATE TABLE menu_x_review (
  menu_id int REFERENCES menu ON DELETE CASCADE,
  review_id int REFERENCES review ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, review_id)
);

DROP TABLE IF EXISTS menu_x_hashtag;

CREATE TABLE menu_x_hashtag (
  menu_id int REFERENCES menu,
  hashtag_id int REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, hashtag_id)
);

DROP TABLE IF EXISTS menu_x_order;

CREATE TABLE menu_x_order (
  menu_id int REFERENCES menu,
  order_id int REFERENCES "order",
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, order_id)
);

DROP TABLE IF EXISTS review_x_hashtag;

CREATE TABLE review_x_hashtag (
  review_id int REFERENCES review,
  hashtag_id int REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (review_id, hashtag_id)
);