import { PostResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from 'src/utils/commons'
import { pool } from '../../database/postgres'

const postStoreSQL = importSQL(__dirname, 'sql/postStore.sql')
const postHashtagSQL = importSQL(__dirname, 'sql/postHashtag.sql')

export const Post: PostResolvers = {
  store: async ({ storeId }) => {
    const { rows } = await pool.query(await postStoreSQL, [storeId])

    return rows[0]
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await postHashtagSQL, [id])

    return rows.map((row) => row.name)
  },
}
