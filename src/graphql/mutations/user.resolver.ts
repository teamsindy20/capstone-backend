import { MutationResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

const sql =
  'insert into music (content, ...) values ($2, ...) where 1 exist (select key from music where key = $1)'

const sql1 = `
create table if not exists user (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  name varchar(100)
);
`

export const Mutation: MutationResolvers = {
  login: (_, { email, passwordHash }) => {
    return new Promise((resolve, reject) => {
      // connection.query(sql, (err: Error, row: any, cols: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      // })
    })
  },

  logout: (_) => {
    return new Promise((resolve, reject) => {
      resolve(true)
      // connection.query(sql, (err: Error, row: any, cols: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      // })
    })
  },

  createUserTable: async (_) => {
    try {
      const result = await pool.query(sql1)
      console.log(result)
    } catch (error) {
      console.error(error)
      console.log(error.message)
      // throw new Error(error.message)
    }
    return true
  },
}
