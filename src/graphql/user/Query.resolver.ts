import { AuthenticationError } from 'apollo-server-express'
import { QueryResolvers } from 'src/graphql/generated/graphql'

export const Query: QueryResolvers = {
  me: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    return user
  },
}
