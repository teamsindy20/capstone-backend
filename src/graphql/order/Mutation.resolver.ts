import { AuthenticationError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createOrderSQL = importSQL(__dirname, 'sql/createOrder.sql')

export const Mutation: MutationResolvers = {
  createOrder: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('User does not log in. Please log in first.')

    const { rows } = await pool.query(await createOrderSQL, [
      // input.orderTotal,
      // user.id,
      // input.storeId,
      // input.menuIds,
    ])

    return rows[0].create_order
  },
}
