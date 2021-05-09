import { AuthenticationError } from 'apollo-server'
import format from 'pg-format'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { QueryResolvers } from '../generated/graphql'

const orders = importSQL(__dirname, 'sql/orders.sql')

export const Query: QueryResolvers = {
  orders: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await poolQuery(await orders, [user.id])

    return rows
  },
}
