import { UserResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

export const User: UserResolvers = {
  favoriteMenus: async () => {
    return null
  },

  favoriteStores: async () => {
    return null
  },

  orders: async () => {
    return null
  },

  preference: async (p) => {
    console.log('favoriteMenu', new Date())
    return ['#a', '#b', '#c']
  },

  regularStores: async () => {
    return null
  },
}
