import { ApolloServer } from 'apollo-server'
import schema from '../graphql/schema'
import { userORM } from '../graphql/user/ORM'
import { pool } from '../database/postgres'
import { verifyJWT } from '../utils/jwt'

const userSQL = 'select * from "user" where id = $1 and is_unregistered = false'

export const server = new ApolloServer({
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    const result = await verifyJWT(token).catch(() => {
      return null
    })

    if (!result) return { user: null } // 로그인 토큰이 없거나 유효하지 않거나 유효기간이 만료됐을 때

    const { rows } = await pool.query(userSQL, [result.userId])

    return { user: userORM(rows[0]) } // 로그인 토큰이 유효할 때
  },
  introspection: true,
  playground: true,
  schema,
})
