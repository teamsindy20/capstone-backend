import { menu } from '../menu/ORM1'

export const store: any = {
  id: '0',
  creationDate: '',
  modificationDate: '',
  name: '',
  address: '',
  deliveryFee: 0,
  minimumDeliveryAmount: 0,
  deliciousReviewCount: 0,
  fineReviewCount: 0,
  badReviewCount: 0,
  newOrderCount: 0,
  reorderCount: 0,
  newCustomerCount: 0,
  regularCustomerCount: 0,
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
    fineReviewCount: store.fine_review_count,
    badReviewCount: store.bad_review_count,
    newOrderCount: store.new_order_count,
    reorderCount: store.reorder_count,
    newCustomerCount: store.new_customer_count,
    regularCustomerCount: store.regular_customer_count,
    favoriteCount: store.favorite_count,
    clickCount: store.click_count,
    postCount: store.post_count,
    menus: [menu],
  }
}
