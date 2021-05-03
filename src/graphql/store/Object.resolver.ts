import { StoreResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'
import format from 'pg-format'
import { selectColumnFromField } from '../../utils/ORM'

const storeMenus = importSQL(__dirname, 'sql/storeMenus.sql')
const storeHashtags = importSQL(__dirname, 'sql/storeHashtags.sql')

export const Store: StoreResolvers = {
  menus: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await storeMenus, columns), [id])

    return rows.map((row) => menuORM(row))
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await storeHashtags, [id])

    return rows.map((row) => row.name)
  },
}
