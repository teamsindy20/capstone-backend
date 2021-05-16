import format from 'pg-format'
import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { selectColumnFromField } from '../../utils/ORM'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'
import { postORM } from '../post/ORM'
import { storeORM } from '../store/ORM'

const searchMenus = importSQL(__dirname, 'sql/searchMenus.sql')
const searchPosts = importSQL(__dirname, 'sql/searchPosts.sql')
const searchStores = importSQL(__dirname, 'sql/searchStores.sql')

export const Query: QueryResolvers = {
  searchMenus: async (_, { hashtag }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await searchMenus, columns), [hashtag])

    return rows.map((row) => menuORM(row))
  },

  searchPosts: async (_, { hashtag }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await searchPosts, columns), [hashtag])

    return rows.map((row) => postORM(row))
  },

  searchStores: async (_, { hashtag }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await searchStores, columns), [hashtag])

    return rows.map((row) => storeORM(row))
  },
}
