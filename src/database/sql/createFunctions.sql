DROP FUNCTION IF EXISTS create_store;

CREATE OR REPLACE FUNCTION create_store (
    name text,
    address text,
    delivery_time_min int DEFAULT NULL,
    delivery_time_max int DEFAULT NULL,
    image_urls text [] DEFAULT NULL,
    hashtags text [] DEFAULT NULL,
    out inserted_store_id bigint
  ) language SQL AS $$ WITH inserted_store AS (
    INSERT INTO store (
        name,
        address,
        delivery_time_min,
        delivery_time_max,
        image_urls
      )
    VALUES (
        name,
        address,
        delivery_time_min,
        delivery_time_max,
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
  store_hashtag AS (
    SELECT id
    FROM inserted_hashtag
    UNION ALL
    SELECT hashtag.id
    FROM hashtag_input
      JOIN hashtag USING (name)
  ),
  inserted_store_x_hashtag AS (
    INSERT INTO store_x_hashtag (store_id, hashtag_id)
    SELECT inserted_store.id,
      store_hashtag.id
    FROM inserted_store,
      store_hashtag
  )
SELECT id
FROM inserted_store;

$$;

DROP FUNCTION IF EXISTS create_menu;

CREATE OR REPLACE FUNCTION create_menu (
    name text,
    price int,
    category text,
    store_id bigint,
    image_urls text [] DEFAULT NULL,
    hashtags text [] DEFAULT NULL,
    out inserted_menu_id bigint
  ) language SQL AS $$ WITH inserted_menu AS (
    INSERT INTO menu (name, price, category, store_id, image_urls)
    VALUES (
        name,
        price,
        category,
        store_id,
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
  ),
  inserted_menu_x_hashtag AS (
    INSERT INTO menu_x_hashtag (menu_id, hashtag_id)
    SELECT inserted_menu.id,
      menu_hashtag.id
    FROM inserted_menu,
      menu_hashtag
  )
SELECT id
FROM inserted_menu;

$$;

DROP FUNCTION IF EXISTS create_post;

CREATE OR REPLACE FUNCTION create_post (
    content text,
    store_id bigint,
    image_urls text [] DEFAULT NULL,
    hashtags text [] DEFAULT NULL,
    out inserted_post_id bigint
  ) language SQL AS $$ WITH inserted_post AS (
    INSERT INTO post (
        content,
        store_id,
        image_urls
      )
    VALUES (content, store_id, image_urls)
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
  post_hashtag AS (
    SELECT id
    FROM inserted_hashtag
    UNION ALL
    SELECT hashtag.id
    FROM hashtag_input
      JOIN hashtag USING (name)
  ),
  inserted_post_x_hashtag AS (
    INSERT INTO post_x_hashtag (post_id, hashtag_id)
    SELECT inserted_post.id,
      post_hashtag.id
    FROM inserted_post,
      post_hashtag
  )
SELECT id
FROM inserted_post;

$$;