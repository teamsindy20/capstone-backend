import format from 'pg-format'
import {
  MenuOptionCategoryResolvers,
  MenuOptionResolvers,
  MenuResolvers,
} from 'src/graphql/generated/graphql'
import {
  menuFieldColumnMapping,
  menuOptionCategoryFieldColumnMapping,
  menuOptionCategoryORM,
  menuOptionFieldColumnMapping,
  menuOptionORM,
  menuORM,
} from './ORM'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { storeFieldColumnMapping, storeORM } from '../store/ORM'
import { selectColumnFromField } from '../../utils/ORM'

const menuCategory = importSQL(__dirname, 'sql/menuCategory.sql')
const menuFavorite = importSQL(__dirname, 'sql/menuFavorite.sql')
const menuHashtags = importSQL(__dirname, 'sql/menuHashtags.sql')
const menuOptionCategories = importSQL(__dirname, 'sql/menuOptionCategories.sql')
const menuStore = importSQL(__dirname, 'sql/menuStore.sql')
const menu = importSQL(__dirname, 'sql/menu.sql')
const menuOptions = importSQL(__dirname, 'sql/menuOptions.sql')
const menuOptionCategory = importSQL(__dirname, 'sql/menuOptionCategory.sql')

function menuOptionCategoryFieldTableColumnMapping(field: any) {
  const column = menuOptionCategoryFieldColumnMapping(field)
  switch (column) {
    case 'creation_date':
    case 'modification_date':
      return `menu_option_category.${column}`
    default:
      return column
  }
}

export const Menu: MenuResolvers = {
  category: async ({ categoryId }) => {
    const { rows } = await poolQuery(await menuCategory, [categoryId])

    return rows[0].name
  },

  favorite: async ({ id }, _, { user }) => {
    if (!user) return false

    const { rowCount } = await poolQuery(await menuFavorite, [user.id, id])

    return !!rowCount
  },

  hashtags: async ({ id }) => {
    const { rows } = await poolQuery(await menuHashtags, [id])

    return rows.map((row) => row.name)
  },

  optionCategories: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuOptionCategoryFieldTableColumnMapping)

    console.log(format(await menuOptionCategories, columns))

    const { rowCount, rows } = await poolQuery(format(await menuOptionCategories, columns), [id])

    return rowCount ? rows.map((row) => menuOptionCategoryORM(row)) : null
  },

  store: async ({ storeId }, _, __, info) => {
    const columns = selectColumnFromField(info, storeFieldColumnMapping)

    const { rows } = await poolQuery(format(await menuStore, columns), [storeId])

    return storeORM(rows[0])
  },
}

export const MenuOptionCategory: MenuOptionCategoryResolvers = {
  menu: async ({ menuId }, _, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menu, columns), [menuId])

    return menuORM(rows[0])
  },

  menuOptions: async ({ id }, _, __, info) => {
    const columns = selectColumnFromField(info, menuOptionFieldColumnMapping)

    const { rows } = await poolQuery(format(await menuOptions, columns), [id])

    return rows.map((row) => menuOptionORM(row))
  },
}

export const MenuOption: MenuOptionResolvers = {
  category: async ({ categoryId }, _, __, info) => {
    const columns = selectColumnFromField(info, menuOptionCategoryFieldColumnMapping)

    const { rows } = await poolQuery(format(await menuOptionCategory, columns), [categoryId])

    return menuOptionCategoryORM(rows[0])
  },
}
