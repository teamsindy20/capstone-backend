import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { storeORM } from './ORM'

const storesSQL = importSQL(__dirname, 'sql/stores.sql')
const storeSQL = importSQL(__dirname, 'sql/store.sql')

export const Query: QueryResolvers = {
  stores: async () => {
    const { rows } = await pool.query(await storesSQL)

    return rows.map((row) => storeORM(row))
  },

  store: async (_, { id }) => {
    const { rows } = await pool.query(await storeSQL, [id])

    return storeORM(rows[0])
  },
}
