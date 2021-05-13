import { Coupon } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'

// Only not null GraphQL fields
export const coupon: Coupon = {
  id: '',
  creationDate: '',
  modificationDate: '',
  name: '',
  type: '',
  discountAmount: 0,
  minimumOrderAmount: 0,
  expirationStartDate: '',
  expirationEndDate: '',
  isUsed: false,
}

export function couponFieldColumnMapping(couponField: keyof Coupon) {
  switch (couponField) {
    case 'order':
      return 'order_id'
    case 'store':
      return 'store_id'
    case 'user':
      return 'user_id'
    default:
      return camelToSnake(couponField)
  }
}

export function couponORM(coupon: Record<string, any>): Coupon {
  return {
    id: coupon.id,
    creationDate: coupon.creation_date,
    modificationDate: coupon.modification_date,
    name: coupon.name,
    type: coupon.type,
    discountAmount: coupon.discount_amount,
    minimumOrderAmount: coupon.minimum_order_amount,
    expirationStartDate: coupon.expiration_start_date,
    expirationEndDate: coupon.expiration_end_date,
    isUsed: coupon.is_used,
    orderId: coupon.order_id,
    storeId: coupon.store_id,
    userId: coupon.user_id,
  }
}
