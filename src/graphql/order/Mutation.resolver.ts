import { AuthenticationError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createOrderSQL = importSQL(__dirname, 'sql/createOrder.sql')

export const Mutation: MutationResolvers = {
  createOrder: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await pool.query(await createOrderSQL, [
      // input.orderTotal,
      // user.id,
      // input.storeId,
      // input.menuIds,
    ])

    return rows[0].create_order
  },
}
