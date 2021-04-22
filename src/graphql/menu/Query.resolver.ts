import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { menuORM } from './orm'

const menusSQL = importSQL(__dirname, 'sql/menus.sql')

export const Query: QueryResolvers = {
  menus: async (_, __, { user }) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const { rows } = await pool.query(await menusSQL)

    return rows.map((row) => menuORM(row))
  },
}
