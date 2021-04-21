DROP PROCEDURE IF EXISTS insert_store;

CREATE OR REPLACE PROCEDURE insert_store (store_id int) language SQL AS $$ WITH inserted_store AS (
    INSERT INTO store (name, price, category, image_urls)
    VALUES (
        name,
        price,
        category,
        image_urls
      )
    RETURNING id
  ),
  hashtag_input (name) AS (
    SELECT unnest(hashtags)
  ),
  newly_inserted_hashtag AS (
    INSERT INTO hashtag (name)
    SELECT *
    FROM hashtag_input ON CONFLICT (name) DO NOTHING
    RETURNING id
  ),
  menu_hashtag AS (
    SELECT id
    FROM newly_inserted_hashtag
    UNION ALL
    SELECT hashtag.id
    FROM hashtag_input
      JOIN hashtag USING (name)
  )
INSERT INTO menu_x_hashtag (menu_id, hashtag_id)
SELECT insert_menu.id,
  menu_hashtag.id
FROM insert_menu,
  menu_hashtag;

$$;

DROP PROCEDURE IF EXISTS insert_menu;

CREATE OR REPLACE PROCEDURE insert_menu (
    store_id int,
    name text,
    price int,
    category text,
    image_urls text [] DEFAULT NULL,
    hashtags text [] DEFAULT NULL
  ) language SQL AS $$ WITH inserted_menu AS (
    INSERT INTO menu (name, price, category, image_urls)
    VALUES (
        name,
        price,
        category,
        image_urls
      )
    RETURNING id
  ),
  hashtag_input (name) AS (
    SELECT unnest(hashtags)
  ),
  inserted_hashtag AS (
    INSERT INTO hashtag (name)
    SELECT *
    FROM hashtag_input ON CONFLICT (name) DO NOTHING
    RETURNING id
  ),
  menu_hashtag AS (
    SELECT id
    FROM inserted_hashtag
    UNION ALL
    SELECT hashtag.id
    FROM hashtag_input
      JOIN hashtag USING (name)
  )
INSERT INTO menu_x_hashtag (menu_id, hashtag_id)
SELECT inserted_menu.id,
  menu_hashtag.id
FROM inserted_menu,
  menu_hashtag;

$$;

call insert_menu(
  '팥빙수',
  5900,
  '아이스크림',
  array ['asdf'],
  array ['#달달', '#비건', '#다이어트']
);

call insert_menu(
  '메리딸기',
  6500,
  '음료',
  array ['https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg'],
  array ['#달달', '#딸기', '#라떼']
);

call insert_menu(
  '나이트로 콜드 브루 톨',
  5800,
  '음료',
  array ['https://globalassets.starbucks.com/assets/55525cd1303a4b18958b05f0705b4cbb.jpg?impolicy=1by1_wide_1242'],
  array ['#거품', '#콜드브루', '#부드러운']
);

call insert_menu(
  '제주 한라봉 뺑오쇼콜라',
  5800,
  '빵',
  array ['https://image.istarbucks.co.kr/upload/store/skuimg/2019/11/%5B9300000002488 %5D_20191106172218633.jpg'],
  array ['#한라봉필', '#초코스틱', '#패스츄리']
);

call insert_menu(
  '춘천 감자빵',
  3000,
  '빵',
  array ['http://belocal.kr/Files/28/News/202006/2101_20200610163604331.JPG'],
  array ['#춘천', '#감자빵', '#고소']
);

call insert_menu(
  '슈크림 라떼',
  3000,
  '커피',
  array ['https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg'],
  array ['#슈크림', '#달달', '#봄음료', '#달콤']
);

call insert_menu(
  '밀푀유 바니',
  9500,
  '빵',
  array ['https://post-phinf.pstatic.net/MjAxOTA4MjJfMjc3/MDAxNTY2NDQwMjY4MDA1.iuAYTuWj97NoOtuI5ha2cPrtO0V2zCLv5U8VPe8GNuwg.LMKtLv4P4rU8d3Ow-NBkFZJDNNJMDuES14lsvohKLU4g.JPEG/%EB%B0%80%ED%91%80%EC%9C%A0%EB%B0%94%EB%8B%88.jpg?type=w1200'],
  array ['#마얘', '#정통프렌치디저트', '#바닐라크림', '#패스츄리', '#고소', '#달달']
);