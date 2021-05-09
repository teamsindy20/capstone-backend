import { PostResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { storeORM } from '../store/ORM'

const postStore = importSQL(__dirname, 'sql/postStore.sql')
const postHashtag = importSQL(__dirname, 'sql/postHashtag.sql')

export const Post: PostResolvers = {
  store: async ({ storeId }) => {
    const { rows } = await pool.query(await postStore, [storeId])

    return storeORM(rows[0])
  },

  hashtags: async ({ id }) => {
    const { rows } = await pool.query(await postHashtag, [id])

    return rows.map((row) => row.name)
  },
}
