/* eslint-disable promise/catch-or-return */
import ON_DEATH from 'death'
import { server } from './apollo/server'
import { disconnectPool, initializeDatabase } from './database/postgres'

// initializeDatabase()

// eslint-disable-next-line promise/always-return
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

ON_DEATH(() => {
  disconnectPool()
})
