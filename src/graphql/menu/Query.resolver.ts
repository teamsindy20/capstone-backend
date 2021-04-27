import { QueryResolvers } from 'src/graphql/generated/graphql'
import { importSQL } from '../../utils/commons'
import { pool } from '../../database/postgres'
import { menuFieldColumnMapping, menuORM } from './ORM'
import format from 'pg-format'
import { selectColumnFromField } from '../../utils/ORM'

const menusSQL = importSQL(__dirname, 'sql/menus.sql')

export const Query: QueryResolvers = {
  menus: async (_, __, { user }, info) => {
    // 사용자에 따라서 맞춤 메뉴 목록 반환

    const columns = selectColumnFromField(info, menuFieldColumnMapping)

    const { rows } = await pool.query(format(await menusSQL, columns))

    return rows.map((row) => menuORM(row))
  },
}
