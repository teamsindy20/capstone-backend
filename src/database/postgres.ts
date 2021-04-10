import dotenv from 'dotenv'
import { Pool } from 'pg'
import { sleep } from '../utils/commons'

dotenv.config()

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

export async function initializeDatabase() {
  while (true) {
    try {
      await pool.query('SELECT NOW() as now')
      console.log('Connected to the PostgreSQL server')
      break
    } catch (error) {
      await sleep(1000)
      console.warn(error)
      // console.log('Waiting for the PostgreSQL server to be alive...')
    }
  }

  // 여기서 테이블 생성하기
}

export async function disconnectPool() {
  await pool.end()
}
