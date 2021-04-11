import { ApolloError } from 'apollo-server-express'
import { MutationResolvers } from 'src/graphql/generated/graphql'
import { pool } from '../../database/postgres'

const sql = `
insert into music (content, ...) 
values ($2, ...) 
where 1 exist (select key 
               from music 
               where key = $1);`

const sql1 = `
create table if not exists "user" (
  id int primary key generated always as identity,
  creation_date timestamptz not null default now(),
  name varchar(100)
);
`

export const Mutation: MutationResolvers = {
  login: async (_, { email, passwordHash }) => {
    const result = await pool.query('SELECT NOW() as now')

    return `${email} ${passwordHash} ${result.rows[0].now}`
  },

  logout: (_) => {
    return true
  },

  createUserTable: async (_) => {
    try {
      // const result = await pool.query(sql1)
      // console.log(result)
    } catch (error) {
      console.error(error)
      // console.log(error.message)
      throw new ApolloError(error.message)
    }
    return true
  },
}
