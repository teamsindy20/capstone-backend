import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool, poolQuery } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from './ORM'
import format from 'pg-format'
import { selectColumnFromField } from '../../utils/ORM'
import { DatabaseQueryError } from '../../apollo/errors'

const menusSQL = importSQL(__dirname, 'sql/menus.sql')
const menusByCategory = importSQL(__dirname, 'sql/menusByCategory.sql')
const menusByTheme = importSQL(__dirname, 'sql/menusByTheme.sql')
const menusByStore = importSQL(__dirname, 'sql/menusByStore.sql')
const menuCategories = importSQL(__dirname, 'sql/menuCategories.sql')
const menuThemes = importSQL(__dirname, 'sql/menuThemes.sql')

export const Query: QueryResolvers = {
  menus: async (_, __, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await menusSQL, columns))

    return rows.map((row) => menuORM(row))
  },

  menusByCategory: async (_, { category }, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await menusByCategory, columns), [category])

    return rows.map((row) => menuORM(row))
  },

  menusByTheme: async (_, { theme }, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await menusByTheme, columns), [theme])

    return rows.map((row) => menuORM(row))
  },

  menusByStore: async (_, { storeId }, info) => {
    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await menusByStore, columns), [storeId])

    return rows.map((row) => menuORM(row))
  },

  menuCategories: async () => {
    const { rows } = await poolQuery(await menuCategories)

    return rows.map((row) => row.name)
  },

  menuThemes: async () => {
    const { rows } = await pool.query(await menuThemes)

    return rows.map((row) => row.name)
  },
}
