import { ApolloError } from 'apollo-server-express'
import { MutationResolvers } from 'src/graphql/generated/graphql'
import { generateJWT } from '../../utils/jwt'
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
    // const user = await findUserFromDatabaseWith({ email, passwordHash })
    // const userId = user.id
    console.log(email, passwordHash)
    const token = generateJWT({ userId: 0 })
    return token
  },

  logout: (_) => {
    return true
  },
}
