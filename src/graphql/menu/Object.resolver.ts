import { MenuResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'

const menuFavoriteSQL = importSQL(__dirname, 'sql/menuFavorite.sql')
const menuHashtagSQL = importSQL(__dirname, 'sql/menuHashtag.sql')

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
}
