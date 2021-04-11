import { QueryResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

const sql = 'select * from users where id=$1;'
const values = [1]

export const Query: QueryResolvers = {
  users: async () => {
    const result = await pool.query('SELECT NOW() as now')

    return [
      {
        id: '0',
        creationDate: result.rows[0].now,
        email: 'email',
        token: 'token',
        name: 'name',
        age: 12,
      },
    ]
  },
}
