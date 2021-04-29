import { ForbiddenError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createMenuSQL = importSQL(__dirname, 'sql/createMenu.sql')
const userStoreSQL = importSQL(__dirname, 'sql/userStore.sql')

export const Mutation: MutationResolvers = {
  createMenu: async (_, { input }, { user }) => {
    const { rows: userStoreRows } = await pool.query(await userStoreSQL, [user.id])

    if (!userStoreRows.includes(input.storeId))
      throw new ForbiddenError('해당 매장을 소유하지 않았습니다.')

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
