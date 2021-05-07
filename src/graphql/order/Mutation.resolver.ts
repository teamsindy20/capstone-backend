import { AuthenticationError } from 'apollo-server'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createOrderSQL = importSQL(__dirname, 'sql/createOrder.sql')

export const Mutation: MutationResolvers = {
  createOrder: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    // 주어진 메뉴 옵션 목록이 주어진 메뉴 목록에 속하는지 확인
    // 메뉴 옵션은 최대 1개만 선택 가능
    // 메뉴 선택 개수는 배열에 선택 개수만큼 중복으로 넣어주기

    const { rows } = await pool.query(await createOrderSQL, [
      // input.orderTotal,
      // user.id,
      // input.storeId,
      // input.menuIds,
    ])

    return rows[0].create_order
  },
}
