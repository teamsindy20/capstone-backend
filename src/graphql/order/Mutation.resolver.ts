import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { pool, transactionQuery } from '../../database/postgres'
import { areAllElementsSame, importSQL, isUniqueArray } from '../../utils/commons'
import { MenuSelectionInput, MutationResolvers } from '../generated/graphql'

const createOrder = importSQL(__dirname, 'sql/createOrder.sql')
const createOrderMenus = importSQL(__dirname, 'sql/createOrderMenus.sql')
const createOrderMenuOptions = importSQL(__dirname, 'sql/createOrderMenuOptions.sql')
const menusSQL = importSQL(__dirname, 'sql/menus.sql')
const menuOptions = importSQL(__dirname, 'sql/menuOptions.sql')

function getMenuIdsWithOption(menu: MenuSelectionInput) {
  return `${menu.id}-${menu.menuOptions?.map((menuOption) => menuOption.id)}`
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

    // 최소주문금액 확인

    const selectedMenuIds = menus.map((menu) => menu.id)
    const selectedMenus = await transactionQuery(client, await menusSQL, [selectedMenuIds])

    if (selectedMenus.rowCount !== selectedMenuIds.length) {
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
    const rawMenusFromTable = await transactionQuery(client, await menuOptions, [selectedMenuIds])

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
        optionIds: menu.menuOptions!.map((menuOption) => menuOption.id), // filter 해주기 때문에 non-null
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

    const menuOptionsFromTable = menusFromTable
      .map((menuFromTable) =>
        menuFromTable.menuOptionCategories
          .map((menuOptionCategory) => menuOptionCategory.menuOptions)
          .flat()
      )
      .flat()

    const menuTotal = menus.reduce(
      (acc, menu) =>
        acc +
        menu.count *
          (selectedMenus.rows.find((selectedMenu) => selectedMenu.id === menu.id)!.price +
            menu.menuOptions?.reduce(
              (acc, menuOption) =>
                acc +
                (menuOptionsFromTable.find(
                  (menuOptionFromTable) => menuOptionFromTable.id === menuOption.id
                )?.price ?? 0),
              0
            ) ?? 0),

      0
    )

    const createOrderResult = await transactionQuery(client, await createOrder, [
      selectedMenus.rows[0].store_id,
      menuTotal,
      payment.paymentId,
      payment.paymentDate,
      user.id,
      deliveryUserInfo.deliveryAddress,
      deliveryUserInfo.deliveryPhoneNumber,
      deliveryUserInfo.deliveryRequest,
      deliveryUserInfo.storeRequest,
      deliveryUserInfo.reviewReward,
      deliveryUserInfo.regularReward,
      deliveryUserInfo.point ?? 0,
      deliveryUserInfo.couponId,
    ])

    // 다중선택형 옵션 선택 개수 미달 or 초과 확인

    // 필수 옵션 선택 여부 확인

    const newOrderId = createOrderResult.rows[0].create_order

    menus.forEach(async (menu) => {
      const createOrderMenusResult = await transactionQuery(client, await createOrderMenus, [
        newOrderId,
        menu.id,
        menu.count,
      ])

      const newOrderMenuId = createOrderMenusResult.rows[0].id

      menu.menuOptions?.forEach(async (menuOption) => {
        await transactionQuery(client, await createOrderMenuOptions, [
          newOrderMenuId,
          menuOption.id,
          menuOption.text,
        ])
      })
    })

    await transactionQuery(client, 'COMMIT')
    client.release()

    return createOrderResult.rows[0].create_order
  },
}
