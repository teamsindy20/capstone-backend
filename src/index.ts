/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from 'dotenv'

dotenv.config({ path: '.env.development' })
dotenv.config()

import { connectDatabase } from './database/postgres'
import { startApolloExpressServer } from './common/express'

connectDatabase()

startApolloExpressServer()
