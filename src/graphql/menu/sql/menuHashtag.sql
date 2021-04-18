select
  hashtag.name
from
  menu
  join menu_x_hashtag on menu_x_hashtag.menu_id = $1
  join hashtag on menu_x_hashtag.hashtag_id = hashtag.id
