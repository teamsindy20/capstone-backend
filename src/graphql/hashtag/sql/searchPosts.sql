-- pgFormatter-ignore
SELECT
  %I
FROM
  post
  JOIN post_x_hashtag ON post.id = post_x_hashtag.post_id
    AND post_x_hashtag.hashtag_id = (
      SELECT
        id
      FROM
        hashtag
    WHERE
      name = $1);

