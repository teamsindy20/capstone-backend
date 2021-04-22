export function storeORM(post: any) {
  return {
    id: post.id,
    creationDate: post.creation_date,
    modificationDate: post.modification_date,
  }
}
