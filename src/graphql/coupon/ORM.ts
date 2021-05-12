import { Coupon } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'

// Only not null GraphQL fields
export const coupon: Coupon = {
  id: '',
  creationDate: '',
  modificationDate: '',
}

export function couponFieldColumnMapping(couponField: keyof Coupon) {
  switch (couponField) {
    default:
      return camelToSnake(couponField)
  }
}

export function couponORM(coupon: Record<string, any>): Coupon {
  return {
    id: coupon.id,
    creationDate: coupon.creation_date,
    modificationDate: coupon.modification_date,
  }
}
