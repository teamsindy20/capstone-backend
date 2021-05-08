import { AuthenticationError } from 'apollo-server'
import { poolQuery } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createStore = importSQL(__dirname, 'sql/createStore.sql')
const pickStore = importSQL(__dirname, 'sql/pickStore.sql')

export const Mutation: MutationResolvers = {
  createStore: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await poolQuery(await createStore, [
      input.name,
      input.address,
      user.id,
      input.reviewEventContent,
      input.regularCustomerEventContent,
      input.deliveryTimeMin,
      input.deliveryTimeMax,
      input.imageUrls,
      input.hashtags,
    ])

    return rows[0].create_store
  },

  pickStore: async (_, { id }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await poolQuery(await pickStore, [user.id, id])

    return rows[0].toggle_user_favorite_store
  },
}
