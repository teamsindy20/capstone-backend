import { sign, verify } from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'

// Initialize jwt private / public keys
// 만약 파일이 빈 값이면 Container 종료하기
const secretKey = readFileSync(join(process.cwd(), 'src/common/etc/jwt/secret.key')).toString()

export function generateJWT(payload: string, expiresIn = '7d') {
  return new Promise((resolve, reject) => {
    sign(payload, secretKey, { expiresIn }, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

export function verifyJWT(token: string) {
  return new Promise((resolve, reject) => {
    verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}
