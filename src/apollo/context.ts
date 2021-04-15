import { ApolloServerExpressConfig } from 'apollo-server-express'
import { pool } from '../database/postgres'
import { verifyJWT } from '../utils/jwt'

const context: ApolloServerExpressConfig['context'] = async ({ req }) => {
  const token = req.headers.authorization || ''

  const result = await verifyJWT(token).catch(() => {
    return null
  })

  if (!result) return { user: null } // 로그인 토큰이 없거나 유효하지 않거나 유효기간이 만료됐을 때

  const { rows } = await pool.query('select * from "user" where id = $1', [result.userId])

  return { user: rows[0] } // 로그인 토큰이 유효할 때
}

export default context
