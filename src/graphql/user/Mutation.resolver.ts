import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { compare, genSalt, hash } from 'bcryptjs'
import { MutationResolvers } from 'src/graphql/generated/graphql'
import { generateJWT } from '../../utils/jwt'
import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'

const registerSQL = importSQL(__dirname, 'sql/register.sql')
const unregisterSQL = importSQL(__dirname, 'sql/unregister.sql')
const loginSQL = importSQL(__dirname, 'sql/login.sql')

export const Mutation: MutationResolvers = {
  register: async (_, { input }, { user }) => {
    if (user) throw new ForbiddenError('User already logged in. Please log out first.')

    const passwordHashHash = await hash(input.passwordHash, await genSalt())

    const registerValues = [
      input.email,
      passwordHashHash,
      input.imageUrl,
      input.name,
      input.phoneNumber,
      input.gender,
      input.birthDate,
      input.address,
    ]

    const result = await pool.query(registerSQL, registerValues)

    return await generateJWT({ userId: result.rows[0] })
  },

  unregister: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('User does not log in. Please log in first.')

    await pool.query(unregisterSQL, [user.id])

    return true
  },

  login: async (_, { email, passwordHash }, { user }) => {
    if (user) throw new ForbiddenError('User already logged in. Please log out first.')

    const { rowCount, rows } = await pool.query(loginSQL, [email])

    if (rowCount === 0) throw new AuthenticationError('Failed to log in. Please check your inputs.')

    const authenticationSuceed = await compare(passwordHash, rows[0].password_hash_hash)

    if (!authenticationSuceed)
      throw new AuthenticationError('Failed to log in. Please check your inputs.')

    return await generateJWT({ userId: rows[0].id })
  },

  logout: (_, __, { user }) => {
    if (!user) throw new AuthenticationError('User does not log in. Please log in first.')

    return true
  },
}
