import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { PoolClient } from 'pg'
import { DatabaseQueryError } from '../../apollo/errors'
import { pool } from '../../database/postgres'
import { areAllElementsSame, importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createOrderSQL = importSQL(__dirname, 'sql/createOrder.sql')
const orderMenus = importSQL(__dirname, 'sql/orderMenus.sql')

async function transactionQuery(client: PoolClient, sql: string, values?: unknown[]) {
  return client.query(sql, values).catch((error) => {
    throw new DatabaseQueryError(error)
  })
}

export const Mutation: MutationResolvers = {
  createOrder: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { menus, payment, user: deliveryUserInfo } = input

    if (menus.length === 0) throw new UserInputError('메뉴 목록을 입력해주세요.')

    const client = await pool.connect()
    await transactionQuery(client, 'BEGIN')

    const selectedMenuIds = menus.map((menu) => menu.id)
    const selectedMenus = await transactionQuery(client, await orderMenus, [selectedMenuIds])

    if (selectedMenus.rowCount === 0) {
      await transactionQuery(client, 'ROLLBACK')
      client.release()
      throw new UserInputError('해당 메뉴가 존재하지 않습니다.')
    }

    if (!areAllElementsSame(selectedMenus.rows.map((selectedMenu) => selectedMenu.store_id))) {
      await transactionQuery(client, 'ROLLBACK')
      client.release()
      throw new UserInputError('하나의 매장에서만 주문할 수 있습니다.')
    }

    // 메뉴 옵션이 해당 메뉴에 속하는지
    // 메뉴 옵션 타입에 따른 선택된 메뉴 옵션 개수 확인

    // 주어진 메뉴 옵션 목록이 주어진 메뉴 목록에 속하는지 확인

    const { rows } = await pool.query(await createOrderSQL, [
      // input.orderTotal,
      // user.id,
      // input.storeId,
      // input.menuIds,
    ])

    await transactionQuery(client, 'COMMIT')
    client.release()

    return rows[0].create_order
  },
}
