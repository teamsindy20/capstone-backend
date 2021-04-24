SELECT hashtag.name
FROM post
  JOIN post_x_hashtag ON post.id = $1
  AND post_x_hashtag.post_id = $1
  JOIN hashtag ON post_x_hashtag.hashtag_id = hashtag.id;