import { ForbiddenError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createPostSQL = importSQL(__dirname, 'sql/createPost.sql')
const userStoreSQL = importSQL(__dirname, 'sql/userStore.sql')

export const Mutation: MutationResolvers = {
  createPost: async (_, { input }, { user }) => {
    // SQL 하나로 합치기?
    const { rows: userStoreRows } = await pool.query(await userStoreSQL, [user.id])

    if (!userStoreRows.includes(input.storeId))
      throw new ForbiddenError('매장 사장님만 글을 작성할 수 있습니다.')

    const { rows } = await pool.query(await createPostSQL, [
      input.content,
      input.storeId,
      input.imageUrls,
      input.hashtags,
    ])

    return rows[0].create_post
  },
}
