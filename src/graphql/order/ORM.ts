import { Order, OrderStatus, User } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'
import { menu } from '../menu/ORM'
import { store } from '../store/ORM'
import { user } from '../user/ORM'
import { payment } from '../payment/ORM'

// Only not null GraphQL fields
export const order: Order = {
  id: '',
  creationDate: '',
  modificationDate: '',
  orderTotal: 0,
  menuTotal: 0,
  deliveryCharge: 0,
  paymentDate: '',
  deliveryAddress: '',
  orderStatus: OrderStatus.OrderWaiting,
  pointUsed: 0,
  userId: '',
  paymentId: '',
  storeId: '',
  user: user,
  payment: payment,
  store: store,
  menus: [menu],
}

export function orderFieldColumnMapping(orderField: keyof Order) {
  switch (orderField) {
    case 'orderTotal':
      return ['menu_total', 'delivery_charge']
    case 'user':
      return 'user_id'
    case 'payment':
      return 'payment_id'
    case 'store':
      return 'store_id'
    case 'menus':
      return ''
    case 'coupon':
      return 'coupon_id'
    case 'menuOptions':
      return ''
    case 'review':
      return ''
    default:
      return camelToSnake(orderField)
  }
}

export function orderORM(order: Record<string, any>): Order {
  return {
    id: order.id,
    creationDate: order.creation_date,
    modificationDate: order.modification_date,
    orderTotal: order.menu_total + order.delivery_charge,
    menuTotal: order.menu_total,
    deliveryCharge: order.delivery_charge,
    paymentDate: order.payment_date,
    deliveryAddress: order.delivery_address,
    orderStatus: order.order_status,
    pointUsed: order.point_used,
    userId: order.user_id,
    paymentId: order.payment_id,
    storeId: order.store_id,
    deliveryRequest: order.delivery_request,
    storeRequest: order.store_request,
    reviewReward: order.review_reward,
    regularReward: order.regular_reward,
    couponId: order.coupon_id,
    user: user,
    payment: payment,
    store: store,
    menus: [menu],
  }
}
