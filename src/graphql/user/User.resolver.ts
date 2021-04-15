import { UserResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

export const User: UserResolvers = {
  favoriteMenu: async () => {
    return null
  },
  favoriteStores: async () => {
    return null
  },
  regularStores: async () => {
    return null
  },
  orders: async () => {
    return null
  },
  preference: async (p) => {
    console.log('favoriteMenu', new Date())
    return ['#a', '#b', '#c']
  },
}
