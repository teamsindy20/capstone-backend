/* eslint-disable no-process-exit */
import dotenv from 'dotenv'
import { sign, verify } from 'jsonwebtoken'
import { NO_JWT_SECRET_KEY_ERROR_CODE } from '../common/errors'

dotenv.config()

function getSecretKey() {
  const secretKey = process.env.JWT_SECRET_KEY

  // 만약 파일이 빈 값이면 프로세스 종료하기
  if (!secretKey) {
    console.error('Error: No JWT secret key')
    // eslint-disable-next-line node/no-process-exit
    process.exit(NO_JWT_SECRET_KEY_ERROR_CODE)
  }

  return secretKey
}

export function generateJWT<T extends Record<string, unknown>>(payload: T, expiresIn = '7d') {
  return new Promise<string>((resolve, reject) => {
    sign(payload, getSecretKey(), { expiresIn }, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}

export function verifyJWT<T extends Record<string, unknown>>(token: string) {
  return new Promise<T>((resolve, reject) => {
    verify(token, getSecretKey(), { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded as T)
    })
  })
}
