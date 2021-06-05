import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { PoolClient } from 'pg'
import { DatabaseQueryError } from '../../apollo/errors'
import { pool } from '../../database/postgres'
import { areAllElementsSame, importSQL, isUniqueArray } from '../../utils/commons'
import { MenuSelectionInput, MutationResolvers } from '../generated/graphql'
import { orderORM } from './ORM'

const createOrderSQL = importSQL(__dirname, 'sql/createOrder.sql')
const orderMenus = importSQL(__dirname, 'sql/orderMenus.sql')
const orderMenuOptions = importSQL(__dirname, 'sql/orderMenuOptions.sql')

async function transactionQuery(client: PoolClient, sql: string, values?: unknown[]) {
  return client.query(sql, values).catch((error) => {
    throw new DatabaseQueryError(error)
  })
}

function getMenuIdsWithOption(menu: MenuSelectionInput) {
  return `${menu.id}-${menu.menuOptions?.map((menuOption) => menuOption.menuOptionId)}`
}

type MenuFromTable = {
  id: string
  menuOptionCategories: {
    id: string
    menuOptions: {
      id: string
      price: number
    }[]
  }[]
}

export const Mutation: MutationResolvers = {
  createOrder: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { menus, payment, user: deliveryUserInfo } = input

    if (menus.length === 0) throw new UserInputError('메뉴 목록이 비어있습니다.')

    if (!isUniqueArray(menus.map(getMenuIdsWithOption)))
      throw new UserInputError('같은 메뉴를 2번 이상 입력했습나다.')

    const client = await pool.connect()
    await transactionQuery(client, 'BEGIN')

    // 포인트 잔액 및 쿠폰 소유 여부 확인

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

    const menusFromTable: MenuFromTable[] = []

    // 데이터베이스로부터 옵션이 있는 메뉴만 반환된다.
    const rawMenusFromTable = await transactionQuery(client, await orderMenuOptions, [
      selectedMenuIds,
    ])

    // Menu, MenuOptionCategory, MenuOption 변환 (Table -> JSON)
    rawMenusFromTable.rows.forEach((rawMenuFromTable) => {
      const menuFromTable = menusFromTable.find(
        (menuFromTable) => menuFromTable.id === rawMenuFromTable.menu_id
      )

      if (menuFromTable) {
        const menuOptionCategoriesFromTable = menuFromTable.menuOptionCategories
        const menuOptionCategoryFromTable = menuOptionCategoriesFromTable.find(
          (menuOptionCategoryFromTable) =>
            menuOptionCategoryFromTable.id === rawMenuFromTable.menu_option_category_id
        )

        if (menuOptionCategoryFromTable) {
          menuOptionCategoryFromTable.menuOptions.push({
            id: rawMenuFromTable.menu_option_id,
            price: rawMenuFromTable.menu_option_price,
          })
        } else {
          menuOptionCategoriesFromTable.push({
            id: rawMenuFromTable.menu_option_category_id,
            menuOptions: [
              { id: rawMenuFromTable.menu_option_id, price: rawMenuFromTable.menu_option_price },
            ],
          })
        }
      } else {
        menusFromTable.push({
          id: rawMenuFromTable.menu_id,
          menuOptionCategories: [
            {
              id: rawMenuFromTable.menu_option_category_id,
              menuOptions: [
                { id: rawMenuFromTable.menu_option_id, price: rawMenuFromTable.menu_option_price },
              ],
            },
          ],
        })
      }
    })

    const menusFromInput = menus
      .filter((menu) => menu.menuOptions)
      .map((menu) => ({
        id: menu.id,
        optionIds: menu.menuOptions!.map((option) => option.menuOptionId), // filter 해주기 때문에 non-null
      }))

    menusFromInput.forEach(async (menu) => {
      const menuFromTable = menusFromTable.find((menuFromTable) => menuFromTable.id === menu.id)

      if (menuFromTable) {
        const menuOptionIdsFromTable = menuFromTable.menuOptionCategories
          .map((optionCategory) => optionCategory.menuOptions.map((option) => option.id))
          .flat()

        if (!menu.optionIds.every((optionId) => menuOptionIdsFromTable.includes(optionId))) {
          await transactionQuery(client, 'ROLLBACK')
          client.release()
          throw new UserInputError(`id=${menu.id} 메뉴의 옵션을 잘못 입력했습니다.`)
        }
      } else {
        await transactionQuery(client, 'ROLLBACK')
        client.release()
        throw new UserInputError(`id=${menu.id} 메뉴는 옵션이 존재하지 않습니다.`)
      }
    })

    // 다중선택형 옵션 선택 개수 미달 or 초과

    // 필수 옵션 미선택

    const { rows } = await pool.query(await createOrderSQL, [
      // input.orderTotal,
      // user.id,
      // input.storeId,
      // input.menuIds,
    ])

    await transactionQuery(client, 'COMMIT')
    client.release()

    return orderORM(rows[0].create_order)
  },
}
