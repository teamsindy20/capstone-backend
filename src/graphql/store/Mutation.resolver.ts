import { AuthenticationError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createStoreSQL = importSQL(__dirname, 'sql/createStore.sql')

export const Mutation: MutationResolvers = {
  createStore: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await pool.query(await createStoreSQL, [
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
}
