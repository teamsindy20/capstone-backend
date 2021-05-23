import { PostResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { storeFieldColumnMapping, storeORM } from '../store/ORM'
import format from 'pg-format'
import { selectColumnFromField } from '../../utils/ORM'

const postStore = importSQL(__dirname, 'sql/postStore.sql')
const postHashtag = importSQL(__dirname, 'sql/postHashtag.sql')

export const Post: PostResolvers = {
  store: async ({ storeId }, _, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping)

    const { rows } = await poolQuery(format(await postStore, columns), [storeId])

    return storeORM(rows[0])
  },

  hashtags: async ({ id }) => {
    const { rows } = await poolQuery(await postHashtag, [id])

    return rows.map((row) => row.name)
  },
}
