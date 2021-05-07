import { ForbiddenError } from 'apollo-server'
import { poolQuery } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createMenu = importSQL(__dirname, 'sql/createMenu.sql')
const userStoreSQL = importSQL(__dirname, 'sql/userStore.sql')

export const Mutation: MutationResolvers = {
  createMenu: async (_, { input }, { user }) => {
    // SQL 하나로 합치기?
    const { rows: userStoreRows } = await poolQuery(await userStoreSQL, [user.id])

    if (!userStoreRows.includes(input.storeId))
      throw new ForbiddenError('해당 매장을 소유하지 않았습니다.')

    const { rows } = await poolQuery(await createMenu, [
      input.name,
      input.price,
      input.category,
      input.storeId,
      input.imageUrls,
      input.hashtags,
    ])

    return rows[0].create_menu
  },

  modifyMenu: async (_, { input }, { user }) => {
    const { rows: userStoreRows } = await poolQuery(await userStoreSQL, [user.id])

    if (!userStoreRows.includes(input.storeId))
      throw new ForbiddenError('해당 매장을 소유하지 않았습니다.')

    // 수정할 메뉴가 특정 주문에 포함되어 있으면 기존 record를 업데이트하지 말고 새로 복사 생성한 후 업데이트 해야 한다.

    return '1'
  },
}
