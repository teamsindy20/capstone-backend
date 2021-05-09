import format from 'pg-format'
import { UserResolvers } from 'src/graphql/generated/graphql'
import { importSQL, removeDoubleQuotesAround } from '../../utils/commons'
import { selectColumnFromField } from '../../utils/ORM'
import { poolQuery } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'
import { storeFieldColumnMapping, storeORM } from '../store/ORM'

const userFavoriteMenus = importSQL(__dirname, 'sql/userFavoriteMenus.sql')
const userFavoriteStores = importSQL(__dirname, 'sql/userFavoriteStores.sql')
const userRegularStores = importSQL(__dirname, 'sql/userRegularStores.sql')

export const User: UserResolvers = {
  favoriteMenus: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await userFavoriteMenus, columns), [id])

    return rows.map((row) => menuORM(row))
  },

  favoriteStores: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping).map((column) =>
      column === 'user_id' ? 'store.user_id' : column
    )

    const formattedSQL = removeDoubleQuotesAround(
      ['store.user_id'],
      format(await userFavoriteStores, columns)
    )

    const { rows } = await poolQuery(formattedSQL, [id])

    console.log(rows[0])

    return rows.map((row) => storeORM(row))
  },

  orders: async () => {
    return null
  },

  preference: async (p) => {
    console.log('favoriteMenu', new Date())
    return ['#a', '#b', '#c']
  },

  regularStores: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping).map((column) =>
      column === 'user_id' ? 'store.user_id' : column
    )

    const formattedSQL = removeDoubleQuotesAround(
      ['store.user_id'],
      format(await userRegularStores, columns)
    )

    const { rows } = await poolQuery(formattedSQL, [id])

    return rows.map((row) => storeORM(row))
  },
}
