import { StoreResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { menuORM } from '../menu/ORM'

const storeMenuSQL = importSQL(__dirname, 'sql/storeMenu.sql')
const storeHashtagSQL = importSQL(__dirname, 'sql/storeHashtag.sql')

export const Store: StoreResolvers = {
  menus: async ({ id }) => {
    const { rows } = await pool.query(await storeMenuSQL, [id])

    return rows.map((row) => menuORM(row))
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await storeHashtagSQL, [id])

    return rows.map((row) => row.name)
  },
}
