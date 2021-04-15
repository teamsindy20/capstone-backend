import { QueryResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

const sql = 'select * from users where id=$1;'
const values = [1]

export const Query: QueryResolvers = {
  me: async (_, __, { user }) => {
    return {
      id: '2',
      creationDate: new Date(),
      modificationDate: new Date(),
      email: 'asdf@asdf.com',
      point: 0,
      preference: [],
    }
  },
}
