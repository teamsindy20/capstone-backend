import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { storeFieldColumnMapping, storeORM } from './ORM'
import { selectColumnFromField } from '../../utils/ORM'
import format from 'pg-format'

const storesSQL = importSQL(__dirname, 'sql/stores.sql')
const storeSQL = importSQL(__dirname, 'sql/store.sql')

export const Query: QueryResolvers = {
  stores: async (_, __, ___, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping)

    const { rows } = await pool.query(format(await storesSQL, columns))

    return rows.map((row) => storeORM(row))
  },

  store: async (_, { id }, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping)

    const { rows } = await pool.query(format(await storeSQL, columns), [id])

    return storeORM(rows[0])
  },
}
