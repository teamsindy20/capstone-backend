import { Order, OrderStatus, Payment } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'
import { menu } from '../menu/ORM'
import { store } from '../store/ORM'
import { user } from '../user/ORM'

// Only not null GraphQL fields
export const payment: Payment = {
  id: '',
  creationDate: '',
  modificationDate: '',
}
