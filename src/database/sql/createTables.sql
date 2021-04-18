drop table if exists "user";

create table "user" (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  point int not null default 0,
  is_unregistered boolean not null default false,
  --
  email varchar(64) not null unique,
  password_hash_hash varchar(128) not null,
  --
  image_url text array,
  name varchar(64),
  phone_number varchar(16),
  gender varchar(16),
  birth_date timestamptz,
  address varchar(64)
);

drop table if exists menu;

create table menu (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  delicious_review_count int not null default 0,
  fine_review_count int not null default 0,
  bad_review_count int not null default 0,
  new_order_count int not null default 0,
  reorder_count int not null default 0,
  new_customer_count int not null default 0,
  regular_customer_count int not null default 0,
  favorite_count int not null default 0,
  click_count int not null default 0,
  store_post_count int not null default 0,
  is_discounted boolean not null default false,
  can_be_picked boolean not null default false,
  can_be_reserved boolean not null default false,
  --
  name varchar(64) not null,
  price int not null,
  category varchar(16) not null,
  --
  image_url text array,
);

drop table if exists store;

create table store (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  delicious_review_count int not null default 0,
  fine_review_count int not null default 0,
  bad_review_count int not null default 0,
  new_order_count int not null default 0,
  reorder_count int not null default 0,
  new_customer_count int not null default 0,
  regular_customer_count int not null default 0,
  favorite_count int not null default 0,
  click_count int not null default 0,
  post_count int not null default 0,
  --
  name varchar(64) not null,
  address varchar(64) not null,
  delivery_fee int not null,
  minimum_delivery_amount int not null,
  --
  image_url text array,
  review_event_content text,
  regular_customer_event_content text,
  delivery_time_min int,
  delivery_time_max int
);

drop table if exists "order";

create table "order" (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  order_status varchar(16) not null default '접수 대기',
  --
  order_total int not null,
  store_id int not null,
  --
  review_id int
);

drop table if exists review;

create table review (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  helping_others_count int not null default 0,
  --
  rating varchar(16) not null,
  --
  image_url text array,
  good_point_content text,
  desired_point_content text
);

drop table if exists post;

create table post (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  like_count int not null default 0,
  comment_count int not null default 0,
  --
  image_url text array,
  content text not null
);

drop table if exists hashtag;

create table hashtag (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  name varchar(32) not null unique
);

drop table if exists menu_category;

create table menu_category (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  name varchar(32) not null unique,
  menu_id int not null array
);

drop table if exists user_x_favorite_menu;

create table user_x_favorite_menu (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  menu_id int not null
);

drop table if exists user_x_favorite_store;

create table user_x_favorite_store (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  store_id int not null
);

drop table if exists user_x_regular_store;

create table user_x_regular_store (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  store_id int not null,
  date_limit_for_regular timestamptz not null,
  order_count_for_regular int not null,
  --
  regular_maintenance_date timestamptz
);

drop table if exists user_x_order;

create table user_x_order (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  order_id int not null unique
);

drop table if exists user_x_review;

create table user_x_review (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  review_id int not null unique
);

drop table if exists user_x_hashtag;

create table user_x_hashtag (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  user_id int not null,
  hashtag_id int not null
);

drop table if exists store_x_menu;

create table store_x_menu (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  store_id int not null,
  menu_id int not null unique
);

drop table if exists store_x_post;

create table store_x_post (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  store_id int not null,
  post_id int not null unique
);

drop table if exists store_x_hashtag;

create table store_x_hashtag (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  store_id int not null,
  hashtag_id int not null
);

drop table if exists menu_x_hashtag;

create table menu_x_hashtag (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  menu_id int not null,
  hashtag_id int not null
);

drop table if exists order_x_menu;

create table order_x_menu (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  order_id int not null,
  menu_id int not null
);

drop table if exists review_x_menu;

create table review_x_menu (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  modification_date timestamptz not null default now(),
  --
  review_id int not null,
  menu_id int not null
);

