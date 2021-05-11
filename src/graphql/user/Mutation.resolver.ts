import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { compare, genSalt, hash } from 'bcryptjs'
import { MutationResolvers } from 'src/graphql/generated/graphql'
import { generateJWT } from '../../utils/jwt'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'

const registerSQL = importSQL(__dirname, 'sql/register.sql')
const unregisterSQL = importSQL(__dirname, 'sql/unregister.sql')
const loginSQL = importSQL(__dirname, 'sql/login.sql')
const logoutSQL = importSQL(__dirname, 'sql/logout.sql')

export const Mutation: MutationResolvers = {
  register: async (_, { input }, { user }) => {
    if (user) throw new ForbiddenError('이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.')

    const passwordHashHash = await hash(input.passwordHash, await genSalt())

    const registerValues = [
      input.email,
      passwordHashHash,
      input.name,
      input.phoneNumber,
      input.gender,
      input.birthDate,
      input.imageUrl,
      input.deliveryAddress,
    ]

    const { rows } = await pool.query(await registerSQL, registerValues)

    return await generateJWT({ userId: rows[0].id, lastLoginDate: new Date() })
  },

  unregister: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    await pool.query(await unregisterSQL, [user.id])

    return true
  },

  login: async (_, { email, passwordHash }, { user }) => {
    if (user) throw new ForbiddenError('이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.')

    const { rowCount, rows } = await pool.query(await loginSQL, [email])

    if (rowCount === 0)
      throw new AuthenticationError('로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.')

    const authenticationSuceed = await compare(passwordHash, rows[0].password_hash_hash)

    if (!authenticationSuceed)
      throw new AuthenticationError('로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.')

    return await generateJWT({ userId: rows[0].id, lastLoginDate: new Date() })
  },

  logout: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    await pool.query(await logoutSQL, [user.id])

    return true
  },
}
