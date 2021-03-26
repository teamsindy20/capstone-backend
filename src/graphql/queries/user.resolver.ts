import { QueryResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

const sql = 'select * from users where id=$1;'
const values = [1]

export const Query: QueryResolvers = {
  users: async () => {
    const result: any = await pool.query(sql, values)
    return result
  },
}
