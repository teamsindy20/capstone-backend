/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'production') dotenv.config()
else dotenv.config({ path: '.env.development' })

import express from 'express'
import { apolloServer } from './apollo/server'
import { connectDatabase } from './database/postgres'

connectDatabase()

async function startApolloExpressServer() {
  const app = express()
  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.use((req, res) => {
    res.status(200)
    res.send('Hello!')
    res.end()
  })

  await new Promise((resolve) => {
    app.listen(process.env.PORT || 4000, resolve as () => void)
  })

  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
}

asdf

startApolloExpressServer()
