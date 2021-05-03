import { camelToSnake, returnZeroWhenZeroDivision } from '../../utils/commons'
import { Store } from '../generated/graphql'
import { menu } from '../menu/ORM'

export const store: Store = {
  id: '0',
  creationDate: '',
  modificationDate: '',
  name: '',
  address: '',
  deliveryFee: 0,
  minimumDeliveryAmount: 0,
  deliciousReviewCount: 0,
  deliciousReviewRatio: 0,
  fineReviewCount: 0,
  fineReviewRatio: 0,
  badReviewCount: 0,
  badReviewRatio: 0,
  positiveReviewCount: 0,
  positiveReviewRatio: 0,
  newOrderCount: 0,
  newOrderRatio: 0,
  reorderCount: 0,
  reorderRatio: 0,
  newCustomerCount: 0,
  newCustomerRatio: 0,
  regularCustomerCount: 0,
  regularCustomerRatio: 0,
  favoriteCount: 0,
  clickCount: 0,
  postCount: 0,
  menus: [menu],
}

export function storeORM(store: any) {
  return {
    id: store.id,
    creationDate: store.creation_date,
    modificationDate: store.modification_date,
    name: store.name,
    address: store.address,
    deliveryFee: store.delivery_fee,
    minimumDeliveryAmount: store.minimum_delivery_amount,
    deliciousReviewCount: store.delicious_review_count,
    deliciousReviewRatio: returnZeroWhenZeroDivision(
      store.fine_review_count,
      store.delicious_review_count + store.fine_review_count + store.bad_review_count
    ),
    fineReviewCount: store.fine_review_count,
    fineReviewRatio: returnZeroWhenZeroDivision(
      store.fine_review_count,
      store.delicious_review_count + store.fine_review_count + store.bad_review_count
    ),
    positiveReviewCount: store.delicious_review_count + store.fine_review_count,
    positiveReviewRatio: returnZeroWhenZeroDivision(
      store.delicious_review_count + store.fine_review_count,
      store.delicious_review_count + store.fine_review_count + store.bad_review_count
    ),
    badReviewCount: store.bad_review_count,
    badReviewRatio: returnZeroWhenZeroDivision(
      store.bad_review_count,
      store.delicious_review_count + store.fine_review_count + store.bad_review_count
    ),
    newOrderCount: store.new_order_count,
    newOrderRatio: returnZeroWhenZeroDivision(
      store.new_order_count,
      store.reorder_count + store.new_order_count
    ),
    reorderCount: store.reorder_count,
    reorderRatio: returnZeroWhenZeroDivision(
      store.reorder_count,
      store.reorder_count + store.new_order_count
    ),
    newCustomerCount: store.new_customer_count,
    newCustomerRatio: returnZeroWhenZeroDivision(
      store.new_customer_count,
      store.new_customer_count + store.regular_customer_count
    ),
    regularCustomerCount: store.regular_customer_count,
    regularCustomerRatio: returnZeroWhenZeroDivision(
      store.regular_customer_count,
      store.new_customer_count + store.regular_customer_count
    ),
    favoriteCount: store.favorite_count,
    clickCount: store.click_count,
    postCount: store.post_count,

    menus: [menu],
  }
}

export function storeFieldColumnMapping(storeField: keyof Store) {
  switch (storeField) {
    case 'deliciousReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'fineReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'positiveReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'badReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'newOrderRatio':
      return ['reorder_count', 'new_order_count']
    case 'reorderRatio':
      return ['reorder_count', 'new_order_count']
    case 'newCustomerRatio':
      return ['new_customer_count', 'regular_customer_count']
    case 'regularCustomerRatio':
      return ['new_customer_count', 'regular_customer_count']
    case 'menus':
      return ''
    case 'hashtags':
      return ''
    case '__typename':
      return ''
    default:
      return camelToSnake(storeField)
  }
}
