import { MenuResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'

const menuCategory = importSQL(__dirname, 'sql/menuCategory.sql')
const menuFavorite = importSQL(__dirname, 'sql/menuFavorite.sql')
const menuStore = importSQL(__dirname, 'sql/menuStore.sql')
const menuHashtags = importSQL(__dirname, 'sql/menuHashtags.sql')

export const Menu: MenuResolvers = {
  category: async ({ categoryId }) => {
    const { rows } = await pool.query(await menuCategory, [categoryId])

    return rows[0].name
  },

  favorite: async ({ id }, __, { user }) => {
    if (!user) return false

    const { rowCount } = await pool.query(await menuFavorite, [user.id, id])

    return !!rowCount
  },

  store: async ({ storeId }, _, __, info) => {
    const { rows } = await pool.query(await menuStore, [storeId])

    return rows[0]
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await menuHashtags, [id])

    return rows.map((row) => row.name)
  },
}
