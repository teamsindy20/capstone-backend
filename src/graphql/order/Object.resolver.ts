import format from 'pg-format'
import { Menu, OrderResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { storeFieldColumnMapping, storeORM } from '../store/ORM'
import { selectColumnFromField } from '../../utils/ORM'
import { menuFieldColumnMapping, menuORM } from '../menu/ORM'

const orderMenus = importSQL(__dirname, 'sql/orderMenus.sql')
const store = importSQL(__dirname, '../store/sql/store.sql')

function menuFieldTableColumnMapping(field: keyof Menu) {
  const column = menuFieldColumnMapping(field)
  switch (column) {
    case 'id':
    case 'creation_date':
      return `menu.${column}`
    default:
      return column
  }
}

export const Order: OrderResolvers = {
  selectedMenus: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuFieldTableColumnMapping)

    const { rows } = await poolQuery(format(await orderMenus, columns), [id])

    return rows.map((row) => menuORM(row))
  },

  store: async ({ storeId }, _, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping)

    const { rows } = await poolQuery(format(await store, columns), [storeId])

    return storeORM(rows[0])
  },
}
