import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createPostSQL = importSQL(__dirname, 'sql/createPost.sql')

export const Mutation: MutationResolvers = {
  createPost: async (_, { input }, { user }) => {
    const { rows } = await pool.query(await createPostSQL, [
      input.content,
      input.storeId,
      input.imageUrls,
      input.hashtags,
    ])

    return true
  },
}
