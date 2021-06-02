import format from 'pg-format'
import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { poolQuery } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from './ORM'
import { selectColumnFromField } from '../../utils/ORM'

const menu = importSQL(__dirname, 'sql/menu.sql')
const menuByName = importSQL(__dirname, 'sql/menuByName.sql')
const menuCategories = importSQL(__dirname, 'sql/menuCategories.sql')
const menus = importSQL(__dirname, 'sql/menus.sql')
const menusByCategory = importSQL(__dirname, 'sql/menusByCategory.sql')
const menusByStore = importSQL(__dirname, 'sql/menusByStore.sql')
const menusByTheme = importSQL(__dirname, 'sql/menusByTheme.sql')
const menuThemes = importSQL(__dirname, 'sql/menuThemes.sql')

export const Query: QueryResolvers = {
  menu: async (_, { id }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rowCount, rows } = await poolQuery(format(await menu, columns), [id])

    return rowCount ? menuORM(rows[0]) : null
  },

  menuByName: async (_, { storeId, name }, __, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rowCount, rows } = await poolQuery(format(await menuByName, columns), [storeId, name])

    return rowCount ? menuORM(rows[0]) : null
  },

  menuCategories: async () => {
    const { rows } = await poolQuery(await menuCategories)

    return rows.map((row) => row.name)
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

  menuThemes: async () => {
    const { rows } = await poolQuery(await menuThemes)

    return rows.map((row) => row.name)
  },
}
