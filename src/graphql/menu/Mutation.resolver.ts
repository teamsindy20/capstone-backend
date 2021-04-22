import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createMenuSQL = importSQL(__dirname, 'sql/createMenu.sql')

export const Mutation: MutationResolvers = {
  createMenu: async (_, { input }, { user }) => {
    // if (user.role !== store) throw new AuthenticationError('매장 사장님만 메뉴를 만들 수 있습니다.')

    const { rows } = await pool.query(await createMenuSQL, [
      input.name,
      input.price,
      input.category,
      input.storeId,
      input.imageUrls,
      input.hashtags,
    ])

    return rows[0].create_menu
  },
}
