/* eslint-disable no-console */
import ON_DEATH from 'death'
import dotenv from 'dotenv'
import { server } from './apollo/server'
import { connectDatabase } from './database/postgres'

dotenv.config()

connectDatabase()

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  .catch((reason) => console.error(reason))

ON_DEATH(() => {
  console.log('Bye bye~')
})
