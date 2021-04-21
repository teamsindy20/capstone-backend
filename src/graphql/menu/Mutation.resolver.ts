import { pool } from '../../database/postgres'
import { importSQL } from '../../utils/commons'
import { MutationResolvers } from '../generated/graphql'

const createMenuSQL = importSQL(__dirname, 'sql/createMenu.sql')

export const Mutation: MutationResolvers = {
  createMenu: async (_, __, { user }) => {
    const { rows } = await pool.query(await createMenuSQL, [
      'name',
      123,
      'category',
      ['url1', 'url2'],
      ['#1', '#2'],
    ])

    return true
  },
}
