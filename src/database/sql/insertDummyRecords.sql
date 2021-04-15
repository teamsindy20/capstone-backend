-- 메뉴 추가하기
with menu_table as (
insert into menu (name, price, category)
    values ('팥빙수', 5900, '아이스크림')
  returning
    id
), image_url_table as (
insert into image_url (url)
    values ('https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg')
  returning
    id
), hashtag_table as (
insert into hashtag (name)
    values ('#달달'), ('#비건'), ('#다이어트')
  returning
    id
), mapping_menu_and_image_url as (
insert into menu_x_image_url (menu_id, image_url_id)
  select
    menu_table.id,
    image_url_table.id
  from
    menu_table,
    image_url_table
),
mapping_menu_and_hashtag as (
insert into menu_x_hashtag (menu_id, hashtag_id)
  select
    menu_table.id,
    hashtag_table.id
  from
    menu_table,
    hashtag_table
)
select
  menu.id as menu_id,
  image_url.id as image_url_id,
  hashtag.id as hashtag_id
from
  menu_table,
  image_url_table,
  hashtag_table;

-- select
--   *
-- from
--   ins insert into menu_x_image_url (menu_id, image_url_id)
--     values ((
--         select
--           menu_id
--         from
--           menu
--         where
--           trip_name = 'MyTrip'), (
--           select
--             image_url_id
--           from
--             places
--           where
--             place_name = 'XYZ'));
-- insert into menu (name, price, category)
--   values ('메리딸기', 6500, '음료');
-- insert into menu (name, price, category)
--   values ('나이트로 콜드 브루 톨(355ml)', 5800, '커피');
-- insert into menu (name, price, category)
--   values ('제주 한라봉 뺑오쇼콜라', 5900, '아이스크림');
-- insert into menu (name, price, category)
--   values ('춘천 감자빵', 3000, '빵');
-- insert into menu (name, price, category)
--   values ('슈크림라떼', 5900, '음료');
-- insert into menu (name, price, category)
--   values ('밀푀유 바니', 5900, '아이스크림');
