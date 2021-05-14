import format from 'pg-format'
import { StoreResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'
import { selectColumnFromField } from '../../utils/ORM'
import { postFieldColumnMapping, postORM } from '../post/ORM'
import { userFieldColumnMapping, userORM } from '../user/ORM'
import { ForbiddenError } from 'apollo-server-express'

const storeMenus = importSQL(__dirname, 'sql/storeMenus.sql')
const storeUser = importSQL(__dirname, 'sql/storeUser.sql')
const storeHashtags = importSQL(__dirname, 'sql/storeHashtags.sql')
const storePosts = importSQL(__dirname, 'sql/storePosts.sql')

const privateUserColumns = [
  'phone_number',
  'gender',
  'birth_date',
  'delivery_address',
  'representative_delivery_address',
]

export const Store: StoreResolvers = {
  menus: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await storeMenus, columns), [id])

    return rows.map((row) => menuORM(row))
  },

  user: async ({ userId }, _, { user }, info) => {
    const columns = selectColumnFromField(info, userFieldColumnMapping)

    if (user.id !== userId) {
      columns.forEach((column) => {
        if (privateUserColumns.includes(column))
          throw new ForbiddenError('다른 사용자의 상세한 개인정보는 조회할 수 없습니다.')
      })
    }

    const { rows } = await poolQuery(format(await storeUser, columns), [userId])

    return userORM(rows[0])
  },

  hashtags: async ({ id }) => {
    const { rows } = await poolQuery(await storeHashtags, [id])

    return rows.map((row) => row.name)
  },

  posts: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, postFieldColumnMapping)

    const { rows } = await poolQuery(format(await storePosts, columns), [id])

    return rows.map((row) => postORM(row))
  },
}
