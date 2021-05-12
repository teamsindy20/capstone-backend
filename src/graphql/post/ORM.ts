import { Post } from '../generated/graphql'
import { store } from '../store/ORM'
import { camelToSnake } from '../../utils/commons'

export const post: Post = {
  id: '',
  creationDate: '',
  modificationDate: '',
  contents: [],
  commentCount: 0,
  likeCount: 0,
  storeId: '',
  store: store,
}

export function postFieldColumnMapping(postField: keyof Post) {
  switch (postField) {
    case 'contents':
      return 'content'
    case 'store':
      return 'store_id'
    case 'hashtags':
      return ''
    default:
      return camelToSnake(postField)
  }
}

export function postORM(post: any): Post {
  return {
    id: post.id,
    creationDate: post.creation_date,
    modificationDate: post.modification_date,
    contents: post.content.split('\\n'),
    commentCount: post.comment_count,
    likeCount: post.like_count,
    imageUrls: post.image_urls,
    storeId: post.store_id,
    store: store,
  }
}
