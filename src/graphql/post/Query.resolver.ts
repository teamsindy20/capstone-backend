import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { postORM } from './ORM'

const postsByStore = importSQL(__dirname, 'sql/postsByStore.sql')
const postsByAddress = importSQL(__dirname, 'sql/postsByAddress.sql')
const postSQL = importSQL(__dirname, 'sql/post.sql')

export const Query: QueryResolvers = {
  postsByStore: async (_, { storeId }) => {
    const { rows } = await pool.query(await postsByStore, [storeId])

    return rows.map((row) => postORM(row))
  },

  postsByAddress: async (_, { address }) => {
    const { rows } = await pool.query(await postsByAddress)

    return rows.map((row) => postORM(row))
  },

  post: async (_, { id }) => {
    const { rows } = await pool.query(await postSQL, [id])

    return postORM(rows[0])
  },
}
