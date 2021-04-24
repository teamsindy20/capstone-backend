import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { postORM } from './ORM'

const postsSQL = importSQL(__dirname, 'sql/posts.sql')
const postSQL = importSQL(__dirname, 'sql/post.sql')

export const Query: QueryResolvers = {
  posts: async (_, { storeId }) => {
    const { rows } = await pool.query(await postsSQL, [storeId])

    return rows.map((row) => postORM(row))
  },

  post: async (_, { id }) => {
    const { rows } = await pool.query(await postSQL, [id])

    return postORM(rows[0])
  },
}
