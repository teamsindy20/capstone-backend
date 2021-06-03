/* eslint-disable import/first */
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: '.env.development' })
dotenv.config()

import { connectDatabase, poolQuery } from '../src/database/postgres'
import { importSQL } from '../src/utils/commons'

const test = importSQL(__dirname, 'sql/test.sql')

;(async () => {
  await connectDatabase()
  const { rows } = await poolQuery(await test, [[1, 2, 3, 4, 6, 7, 9]])

  console.log(rows)
})()
