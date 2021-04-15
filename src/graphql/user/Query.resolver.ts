import { AuthenticationError } from 'apollo-server'
import { QueryResolvers } from 'src/graphql/generated/graphql'

export const Query: QueryResolvers = {
  me: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError("User doesn't log in. Please log in first.")

    return user
  },
}
