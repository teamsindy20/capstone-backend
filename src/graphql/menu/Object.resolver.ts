import { MenuResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'

const menuFavoriteSQL = importSQL(__dirname, 'sql/menuFavorite.sql')
const menuHashtagSQL = importSQL(__dirname, 'sql/menuHashtag.sql')
const menuStoreSQL = importSQL(__dirname, 'sql/menuStore.sql')

export const Menu: MenuResolvers = {
  favorite: async (_, __, { user }) => {
    if (!user) return false

    const { rows } = await pool.query(await menuFavoriteSQL, [user.id])

    return !!rows[0]
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await menuHashtagSQL, [id])
    return rows.map((row) => row.name)
  },

  store: async ({ storeId }) => {
    const { rows } = await pool.query(await menuStoreSQL, [storeId])
    console.log(rows[0])
    return rows[0]
  },
}
