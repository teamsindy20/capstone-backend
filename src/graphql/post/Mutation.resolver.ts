import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createPostSQL = importSQL(__dirname, 'sql/createPost.sql')

export const Mutation: MutationResolvers = {
  createPost: async (_, { input }, { user }) => {
    // if (user.role !== store) throw new AuthenticationError('매장 사장님만 글을 작성할 수 있습니다.')

    const { rows } = await pool.query(await createPostSQL, [
      input.content,
      input.storeId,
      input.imageUrls,
      input.hashtags,
    ])

    return rows[0].create_post
  },
}
