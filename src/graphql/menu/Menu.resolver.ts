import { MenuResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'

const menuFavoriteSQL = importSQL(__dirname, 'sql/menuFavorite.sql')
const menuHashtagSQL = importSQL(__dirname, 'sql/menuHashtag.sql')
const menuImageUrlSQL = importSQL(__dirname, 'sql/menuImageUrl.sql')

export const Menu: MenuResolvers = {
  favorite: async (_, __, { user }) => {
    if (!user) return false

    const { rows } = await pool.query(menuFavoriteSQL, [user.id])

    return !!rows[0]
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(menuHashtagSQL, [id])
    return rows.map((row) => row.name)
  },

  imageUrls: async ({ id }) => {
    const { rows } = await pool.query(menuImageUrlSQL, [id])
    return rows.map((row) => row.url)
  },
}
