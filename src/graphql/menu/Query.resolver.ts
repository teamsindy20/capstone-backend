import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { menuORM } from './orm'

const menusSQL = importSQL(__dirname, 'sql/menus.sql')

export const Query: QueryResolvers = {
  menus: async (_, __, { user }) => {
    const { rows } = await pool.query(await menusSQL)

    return rows.map((row) => menuORM(row))
  },
}
