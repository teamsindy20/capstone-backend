import dotenv from 'dotenv'
import { Pool } from 'pg'
import { sleep } from '../utils/commons'

dotenv.config()

export const pool = '12'

// export const pool = new Pool({
//   // connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_USER}`,
//   host: 'postgres',
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_USER,
// })

// // console.log(process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD)

// export async function initializeDatabase() {
//   while (true) {
//     try {
//       await pool.query('SELECT NOW() as now')
//       console.log('Connected to the PostgreSQL server')
//       break
//     } catch (error) {
//       await sleep(1000)
//       console.warn(error)
//       // console.log('Waiting for the PostgreSQL server to be alive...')
//     }
//   }

//   // 여기서 테이블 생성하기
// }

// export async function disconnectPool() {
//   await pool.end()
// }
