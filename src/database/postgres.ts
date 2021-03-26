import dotenv from 'dotenv'
import { Pool, Client } from 'pg'

dotenv.config()

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function initializeDatabase() {
  return 0
}

export async function disconnectPool() {
  await pool.end()
}
