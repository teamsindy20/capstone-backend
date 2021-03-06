import { Pool, PoolClient } from 'pg'
import { DatabaseQueryError } from '../apollo/errors'
import { sleep } from '../utils/commons'

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

export async function poolQuery(query: string, values?: unknown[]) {
  return pool.query(query, values).catch((error) => {
    throw new DatabaseQueryError(error)
  })
}

export async function transactionQuery(client: PoolClient, sql: string, values?: unknown[]) {
  return client.query(sql, values).catch(async (error) => {
    await client.query('ROLLBACK')
    client.release()
    throw new DatabaseQueryError(error)
  })
}

export async function connectDatabase() {
  while (true) {
    try {
      await pool.query('SELECT NOW() as now')
      console.log('Connected to the PostgreSQL server')
      break
    } catch (error) {
      await sleep(5000)
      console.warn(error)
    }
  }
}
