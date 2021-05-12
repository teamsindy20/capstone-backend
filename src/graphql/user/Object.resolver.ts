import format from 'pg-format'
import { poolQuery } from 'src/database/postgres'
import { couponFieldColumnMapping, couponORM } from '../coupon/ORM'
import { UserResolvers } from '../generated/graphql'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'
import { storeFieldColumnMapping, storeORM } from '../store/ORM'
import { importSQL, removeDoubleQuotesAround } from '../../utils/commons'
import { selectColumnFromField } from '../../utils/ORM'

const userCoupons = importSQL(__dirname, 'sql/userCoupons.sql')
const userFavoriteMenus = importSQL(__dirname, 'sql/userFavoriteMenus.sql')
const userFavoriteStores = importSQL(__dirname, 'sql/userFavoriteStores.sql')
const userRegularStores = importSQL(__dirname, 'sql/userRegularStores.sql')
const userPreferences = importSQL(__dirname, 'sql/userPreferences.sql')

export const User: UserResolvers = {
  coupons: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, couponFieldColumnMapping)

    const { rows } = await poolQuery(format(await userCoupons, columns), [id])

    return rows.map((row) => couponORM(row))
  },

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

    return rows.map((row) => storeORM(row))
  },

  orders: async () => {
    return null
  },

  preferences: async ({ id }) => {
    const { rows } = await poolQuery(await userPreferences, [id])

    return rows
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
