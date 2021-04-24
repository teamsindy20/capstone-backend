import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createStoreSQL = importSQL(__dirname, 'sql/createStore.sql')

export const Mutation: MutationResolvers = {
  createStore: async (_, { input }, { user }) => {
    const { rows } = await pool.query(await createStoreSQL, [
      input.name,
      input.address,
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
