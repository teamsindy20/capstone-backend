import express from 'express'

import { setPassportStrategies } from './passport'
import { apolloServer } from '../apollo/server'

export async function startApolloExpressServer() {
  const app = express()
  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: true,
  })

  setPassportStrategies(app)

  await new Promise((resolve) => {
    app.listen(process.env.PORT || 4000, resolve as () => void)
  })

  console.log(
    `🚀 Server ready at ${process.env.BACKEND_URL}:${process.env.PORT}${apolloServer.graphqlPath}`
  )
}
