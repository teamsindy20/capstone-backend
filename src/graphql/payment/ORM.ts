import { Payment } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'

// Only not null GraphQL fields
export const payment: Payment = {
  id: '',
  creationDate: '',
  modificationDate: '',
}

export function paymentORM(payment: Record<string, any>): Payment {
  return {
    id: payment.id,
    creationDate: payment.creation_date,
    modificationDate: payment.modification_date,
  }
}

export function paymentFieldColumnMapping(paymentField: keyof Payment) {
  switch (paymentField) {
    default:
      return camelToSnake(paymentField)
  }
}
