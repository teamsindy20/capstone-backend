import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { storeORM } from './orm'

const storesSQL = importSQL(__dirname, 'sql/stores.sql')

export const Query: QueryResolvers = {
  posts: async (_, { storeId }) => {
    const { rows } = await pool.query(await storesSQL, [storeId])

    return rows.map((row) => storeORM(row))
  },
}
