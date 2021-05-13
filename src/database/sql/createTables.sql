DROP SCHEMA public CASCADE;

CREATE SCHEMA public AUTHORIZATION sindy;

COMMENT ON SCHEMA public IS 'standard public schema';

GRANT ALL ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO sindy;

DROP SCHEMA deleted CASCADE;

CREATE SCHEMA deleted AUTHORIZATION sindy;

COMMENT ON SCHEMA deleted IS 'deleted records history';

GRANT ALL ON SCHEMA deleted TO sindy;

-- valid_authentication_date 이후의 JWT 토큰만 유효함
CREATE TABLE "user" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  email varchar(64) NOT NULL UNIQUE,
  point int NOT NULL DEFAULT 0 CHECK (point >= 0),
  --
  name varchar(64),
  phone_number varchar(32),
  gender varchar(16),
  birth_date timestamptz,
  image_urls text ARRAY,
  delivery_addresses varchar(64) ARRAY,
  representative_delivery_address int CHECK (representative_delivery_address >= 1),
  --
  password_hash_hash varchar(128) NOT NULL,
  valid_authentication_date timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE deleted."user" (
  id bigint PRIMARY KEY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  deletion_date timestamptz NOT NULL DEFAULT NOW(),
  --
  email varchar(64) NOT NULL UNIQUE,
  point int NOT NULL DEFAULT 0 CHECK (point >= 0),
  --
  name varchar(64),
  phone_number varchar(32),
  gender varchar(16),
  birth_date timestamptz,
  image_urls text ARRAY,
  delivery_addresses varchar(64) ARRAY,
  representative_delivery_address int CHECK (representative_delivery_address >= 1)
);

CREATE TABLE store (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(64) NOT NULL,
  address varchar(64) NOT NULL,
  business_registration_name varchar(64) NOT NULL,
  business_registration_number varchar(64) NOT NULL,
  business_registration_address varchar(64) NOT NULL,
  business_representative_name varchar(64) NOT NULL,
  --
  delivery_charge int NOT NULL DEFAULT 0,
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
  minimum_delivery_time int,
  maximum_delivery_time int,
  image_urls text ARRAY
);

CREATE TABLE menu_category (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) UNIQUE NOT NULL,
  menu_category_id bigint REFERENCES menu_category ON DELETE CASCADE
);

CREATE TABLE menu_theme (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) UNIQUE NOT NULL
);

CREATE TABLE menu (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(64) NOT NULL,
  price int NOT NULL,
  --
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
  category_id bigint NOT NULL REFERENCES menu_category ON DELETE CASCADE,
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  image_urls text ARRAY,
  --
  theme_id bigint REFERENCES menu_theme ON DELETE CASCADE
);

CREATE INDEX menu_store_id ON menu (store_id);

CREATE INDEX menu_category_id ON menu (category_id);

CREATE INDEX menu_theme_id ON menu (theme_id);

-- type은 '양자택일형', '단일선택형', '다중선택형', '서술형'
-- selection_count는 '다중선택형'일 때 사용
CREATE TABLE menu_option_category (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --  
  name varchar(32) NOT NULL,
  "type" varchar(16) NOT NULL,
  --
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  is_necessary boolean NOT NULL DEFAULT false,
  --
  minimum_selection_count int,
  maximum_selection_count int
);

CREATE TABLE menu_option (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL,
  price int NOT NULL DEFAULT 0,
  --
  menu_id bigint NOT NULL REFERENCES menu ON DELETE CASCADE
);

CREATE TABLE payment (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL
);

CREATE TABLE "order" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY
);

-- type은 '정액형', '정률형'
-- user_id: 쿠폰 소유 사용자 
-- store_id: 쿠폰 발행 매장
-- order_id: 쿠폰을 사용한 주문
-- 쿠폰의 유효기간 = 쿠폰 다운로드 가능 기간
CREATE TABLE coupon (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL,
  "type" varchar(16) NOT NULL,
  discount_amount int NOT NULL CHECK (discount_amount >= 0),
  minimum_order_amount int NOT NULL CHECK (minimum_order_amount >= 0),
  expiration_start_date timestamptz NOT NULL,
  expiration_end_date timestamptz NOT NULL CHECK (expiration_start_date < expiration_end_date),
  --
  is_used boolean NOT NULL DEFAULT false,
  --
  order_id bigint REFERENCES "order" ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE,
  user_id bigint REFERENCES "user" ON DELETE CASCADE
);

DROP TABLE "order" CASCADE;

CREATE TABLE "order" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  menu_total int NOT NULL CHECK (menu_total >= 0),
  delivery_charge int NOT NULL CHECK (delivery_charge >= 0),
  payment_date timestamptz NOT NULL,
  delivery_address varchar(64) NOT NULL,
  --
  order_status varchar(16) NOT NULL DEFAULT '접수 대기',
  point_used int NOT NULL DEFAULT 0 CHECK (point_used >= 0),
  review_reward boolean NOT NULL DEFAULT false,
  regular_reward boolean NOT NULL DEFAULT false,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  payment_id bigint NOT NULL REFERENCES payment ON DELETE CASCADE,
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  --
  delivery_request varchar(256),
  store_request varchar(256),
  --
  coupon_id bigint REFERENCES coupon ON DELETE CASCADE
);

ALTER TABLE coupon
ADD FOREIGN KEY (order_id) REFERENCES "order";

-- 쿠폰을 사용할 수 있는 매장 관계
CREATE TABLE store_x_coupon (
  store_id bigint REFERENCES store ON DELETE CASCADE,
  coupon_id bigint REFERENCES coupon ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (store_id, coupon_id)
);

-- 주문할 때 선택한 메뉴 옵션
-- menu_option_text는 메뉴 옵션이 '서술형'일 떄 사용
CREATE TABLE order_x_menu (
  order_id bigint REFERENCES "order" ON DELETE CASCADE,
  menu_id bigint REFERENCES menu ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  "count" int NOT NULL,
  menu_option_selections jsonb,
  --
  PRIMARY KEY (order_id, menu_id)
);

-- CREATE TABLE promotion (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   creation_date timestamptz NOT NULL DEFAULT NOW(),
--   modification_date timestamptz NOT NULL DEFAULT NOW(),
--   --
--   name varchar(32) NOT NULL,
--   operattion varchar(16) NOT NULL,
--   discount_amount int NOT NULL,
--   --
--   order_id bigint REFERENCES menu ON DELETE CASCADE,
--   store_id bigint REFERENCES store ON DELETE CASCADE
-- );
CREATE TABLE review (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  rating varchar(16) NOT NULL,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE,
  order_id bigint NOT NULL REFERENCES "order" ON DELETE CASCADE,
  --
  helping_others_count int NOT NULL DEFAULT 0,
  image_urls text ARRAY,
  good_point_content text,
  desired_point_content text
);

-- CREATE TABLE post_category (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   creation_date timestamptz NOT NULL DEFAULT NOW(),
--   modification_date timestamptz NOT NULL DEFAULT NOW(),
--   --
--   name varchar(64) NOT NULL
-- );
CREATE TABLE post (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  content text NOT NULL,
  --
  comment_count int NOT NULL DEFAULT 0,
  like_count int NOT NULL DEFAULT 0,
  --
  image_urls text ARRAY,
  --
  store_id bigint NOT NULL REFERENCES store ON DELETE CASCADE --,
  -- post_category_id bigint NOT NULL REFERENCES post_category ON DELETE CASCADE
);

CREATE TABLE user_x_liked_post (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  post_id bigint REFERENCES post ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE "comment" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  content varchar(256) NOT NULL,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  post_id bigint NOT NULL REFERENCES post ON DELETE CASCADE,
  --
  comment_id bigint REFERENCES "comment" ON DELETE CASCADE
);

CREATE TABLE hashtag (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  name varchar(32) NOT NULL UNIQUE
);

CREATE TABLE banner_advertisement (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  imageUrl text NOT NULL UNIQUE,
  advertisement_start_date timestamptz NOT NULL,
  advertisement_end_date timestamptz NOT NULL CHECK (
    advertisement_start_date < advertisement_end_date
  )
);

CREATE UNIQUE INDEX hashtag_name ON hashtag (name);

CREATE TABLE user_x_favorite_store (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  store_id bigint REFERENCES store ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, store_id)
);

CREATE TABLE deleted.user_x_favorite_store (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint NOT NULL,
  store_id bigint NOT NULL,
  creation_date timestamptz NOT NULL,
  deletion_date timestamptz NOT NULL DEFAULT NOW()
);

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

CREATE TABLE user_x_favorite_menu (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  menu_id bigint REFERENCES menu ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, menu_id)
);

CREATE TABLE deleted.user_x_favorite_menu (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint NOT NULL,
  menu_id bigint NOT NULL,
  creation_date timestamptz NOT NULL,
  deletion_date timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE user_x_hashtag (
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  hashtag_id bigint REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, hashtag_id)
);

CREATE TABLE store_x_hashtag (
  store_id bigint REFERENCES store ON DELETE CASCADE,
  hashtag_id bigint REFERENCES hashtag ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (store_id, hashtag_id)
);

CREATE TABLE menu_x_review (
  menu_id bigint REFERENCES menu ON DELETE CASCADE,
  review_id bigint REFERENCES review ON DELETE CASCADE,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, review_id)
);

CREATE TABLE menu_x_hashtag (
  menu_id bigint REFERENCES menu,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, hashtag_id)
);

CREATE TABLE menu_x_order (
  menu_id bigint REFERENCES menu,
  order_id bigint REFERENCES "order",
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_id, order_id)
);

CREATE TABLE menu_option_x_order (
  menu_option_id bigint REFERENCES menu_option,
  order_id bigint REFERENCES "order",
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (menu_option_id, order_id)
);

CREATE TABLE review_x_hashtag (
  review_id bigint REFERENCES review,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (review_id, hashtag_id)
);

CREATE TABLE post_x_hashtag (
  post_id bigint REFERENCES post,
  hashtag_id bigint REFERENCES hashtag,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (post_id, hashtag_id)
);