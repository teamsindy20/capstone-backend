import format from 'pg-format'
import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from './ORM'
import { selectColumnFromField } from '../../utils/ORM'

const menu = importSQL(__dirname, 'sql/menu.sql')
const menus = importSQL(__dirname, 'sql/menus.sql')
const menusByCategory = importSQL(__dirname, 'sql/menusByCategory.sql')
const menusByTheme = importSQL(__dirname, 'sql/menusByTheme.sql')
const menusByStore = importSQL(__dirname, 'sql/menusByStore.sql')
const menuCategories = importSQL(__dirname, 'sql/menuCategories.sql')
const menuThemes = importSQL(__dirname, 'sql/menuThemes.sql')

export const Query: QueryResolvers = {
  menu: async (_, { id }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menu, columns), [id])

    return menuORM(rows[0])
  },

  menus: async (_, __, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menus, columns))

    return rows.map((row) => menuORM(row))
  },

  menusByCategory: async (_, { category }, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menusByCategory, columns), [category])

    return rows.map((row) => menuORM(row))
  },

  menusByTheme: async (_, { theme }, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menusByTheme, columns), [theme])

    return rows.map((row) => menuORM(row))
  },

  menusByStore: async (_, { storeId }, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await poolQuery(format(await menusByStore, columns), [storeId])

    return rows.map((row) => menuORM(row))
  },

  menuCategories: async () => {
    const { rows } = await poolQuery(await menuCategories)

    return rows.map((row) => row.name)
  },

  menuThemes: async () => {
    const { rows } = await poolQuery(await menuThemes)

    return rows.map((row) => row.name)
  },
}
