import { AuthenticationError } from 'apollo-server-express'
import format from 'pg-format'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { QueryResolvers } from '../generated/graphql'
import { orderFieldColumnMapping, orderORM } from './ORM'
import { selectColumnFromField } from '../../utils/ORM'

const orders = importSQL(__dirname, 'sql/orders.sql')

export const Query: QueryResolvers = {
  orders: async (_, __, { user }, info) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const columns = selectColumnFromField(info, orderFieldColumnMapping)

    const { rows } = await poolQuery(format(await orders, columns), [user.id])

    return rows.map((row) => orderORM(row))
  },

  order: async (_, { id }, { user }, info) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const columns = selectColumnFromField(info, orderFieldColumnMapping)

    const { rows } = await poolQuery(format(await orders, columns), [id])

    return orderORM(rows[0])
  },
}
