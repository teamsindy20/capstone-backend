import { ApolloServerExpressConfig } from 'apollo-server-express'
import { verifyJWT } from '../utils/jwt'

const users = [
  {
    id: '1',
    email: 'asdf@asdf.com',
    token: 'adslkfjweri32r32',
  },
  {
    id: '2',
    email: 'asdfasdf@asdf.com',
    token: '1231231i32r32',
  },
]

const context: ApolloServerExpressConfig['context'] = async ({ req }) => {
  const token = req.headers.authorization || ''

  try {
    const result = await verifyJWT<{ userId: number }>(token)
    const user = users.find((user) => user.id === `${result.userId}`)
    return { user } // 로그인 토큰이 유효할 때
  } catch (error) {
    return { user: null } // 로그인 토큰이 없거나 유효하지 않거나 유효기간이 만료됐을 때
  }
}

export default context
