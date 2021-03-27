import dotenv from 'dotenv'
import { Pool, Client } from 'pg'

dotenv.config()

export const pool = new Pool({
  // connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@postgres:5432/${process.env.PGUSER}`,
  host: 'postgres',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_USER,
})

export async function initializeDatabase() {
  try {
    // 여기서 테이블 생성하기
    const result = await pool.query('SELECT NOW() as now')
    console.log(result.rows)
  } catch (error) {
    console.error(error)
  }
}

export async function disconnectPool() {
  await pool.end()
}
