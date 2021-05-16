import { AuthenticationError } from 'apollo-server-express'
import { QueryResolvers } from 'src/graphql/generated/graphql'
import { poolQuery } from '../../database/postgres'
import { importSQL } from '../../utils/commons'

const verifyUniqueEmail = importSQL(__dirname, 'sql/verifyUniqueEmail.sql')

export const Query: QueryResolvers = {
  me: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    return user
  },

  verifyUniqueEmail: async (_, { email }) => {
    const { rowCount } = await poolQuery(await verifyUniqueEmail, [email])

    return rowCount === 0
  },
}
