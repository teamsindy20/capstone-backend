SELECT
  % I
FROM
  menu
  JOIN menu_x_hashtag ON menu.id = menu_x_hashtag.menu_id
    AND menu_x_hashtag.hashtag_id = (
      SELECT
        id
      FROM
        hashtag
    WHERE
      name = $1);

