import { ExpressContext } from 'apollo-server-express'
import { pool } from '../database/postgres'
import { verifyJWT } from '../utils/jwt'

function formatUserFromDatabaseToGraphQL(user: any) {
  return {
    id: user.id,
    creationDate: user.creation_date,
    modificationDate: user.modification_date,
    point: user.point,
    email: user.email,
    imageUrl: user.image_url,
    name: user.name,
    phoneNumber: user.phone_number,
    gender: user.gender,
    birthDate: user.birth_date,
    address: user.address,
  }
}

async function context({ req }: ExpressContext) {
  const token = req.headers.authorization || ''

  const result = await verifyJWT(token).catch(() => {
    return null
  })

  if (!result) return { user: null } // 로그인 토큰이 없거나 유효하지 않거나 유효기간이 만료됐을 때

  const { rows } = await pool.query('select * from "user" where id = $1', [result.userId])

  return { uesr: formatUserFromDatabaseToGraphQL(rows[0]) } // 로그인 토큰이 유효할 때
}

export default context
