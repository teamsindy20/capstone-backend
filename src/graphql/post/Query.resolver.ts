import format from 'pg-format'
import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { postFieldColumnMapping, postORM } from './ORM'
import { selectColumnFromField } from '../../utils/ORM'

const postsByStore = importSQL(__dirname, 'sql/postsByStore.sql')
const postsByAddress = importSQL(__dirname, 'sql/postsByAddress.sql')
const postSQL = importSQL(__dirname, 'sql/post.sql')

export const Query: QueryResolvers = {
  postsByStore: async (_, { storeId }, __, info) => {
    const columns = selectColumnFromField(info, postFieldColumnMapping)

    const { rows } = await poolQuery(format(await postsByStore, columns), [storeId])

    return rows.map((row) => postORM(row))
  },

  postsByAddress: async (_, { address }, __, info) => {
    const columns = selectColumnFromField(info, postFieldColumnMapping)

    const { rows } = await poolQuery(format(await postsByAddress, columns))

    return rows.map((row) => postORM(row))
  },

  post: async (_, { id }, __, info) => {
    const columns = selectColumnFromField(info, postFieldColumnMapping)

    const { rows } = await poolQuery(format(await postSQL, columns), [id])

    return postORM(rows[0])
  },
}
