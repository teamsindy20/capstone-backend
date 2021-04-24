import { store } from '../store/ORM'

export function postORM(post: any) {
  return {
    id: post.id,
    creationDate: post.creation_date,
    modificationDate: post.modification_date,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    content: post.content.split('\\n'),
    storeId: post.store_id,
    imageUrls: post.image_urls,
    store: store,
  }
}
