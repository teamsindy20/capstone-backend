/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: '.env.development' })
dotenv.config()

import { connectDatabase } from './database/postgres'
import { startApolloExpressServer } from './common/express'

connectDatabase()

startApolloExpressServer()
