import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { poolQuery } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const userStore = importSQL(__dirname, 'sql/userStore.sql')
const createMenu = importSQL(__dirname, 'sql/createMenu.sql')
const pickMenu = importSQL(__dirname, 'sql/pickMenu.sql')

export const Mutation: MutationResolvers = {
  createMenu: async (_, { input }, { user }) => {
    // SQL 하나로 합치기?
    const { rows: userStoreRows } = await poolQuery(await userStore, [user.id])

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
    const { rows: userStoreRows } = await poolQuery(await userStore, [user.id])

    if (!userStoreRows.includes(input.storeId))
      throw new ForbiddenError('해당 매장을 소유하지 않았습니다.')

    // 수정할 메뉴가 특정 주문에 포함되어 있으면 기존 record를 업데이트하지 말고 새로 복사 생성한 후 업데이트 해야 한다.

    return '1'
  },

  pickMenu: async (_, { id }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await poolQuery(await pickMenu, [user.id, id])

    return rows[0].toggle_user_favorite_menu
  },
}
