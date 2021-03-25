/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import ON_DEATH from 'death'
import { server } from './apollo/server'
import { connectMySql, disconnectMySql } from './database/mysql'

// connectMySql()

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at 3월 25일 오후 4:31${url}`)
})

// ON_DEATH(() => {
//   try {
//     disconnectMySql()
//   } catch (err) {
//     console.error(err)
//   }
// })
