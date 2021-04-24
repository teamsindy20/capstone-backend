import { store } from '../store/ORM'

function returnZeroWhenZeroDivision(numerator: number, denominator: number) {
  return denominator !== 0 ? numerator / denominator : 0
}

export function menuORM(menu: any) {
  return {
    id: menu.id,
    creationDate: menu.creation_date,
    modificationDate: menu.modification_date,
    deliciousReviewCount: menu.delicious_review_count,
    deliciousReviewRatio: returnZeroWhenZeroDivision(
      menu.delicious_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    fineReviewCount: menu.fine_review_count,
    fineReviewRatio: returnZeroWhenZeroDivision(
      menu.fine_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    positiveReviewRatio: returnZeroWhenZeroDivision(
      menu.delicious_review_count + menu.fine_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    badReviewCount: menu.bad_review_count,
    badReviewRatio: returnZeroWhenZeroDivision(
      menu.bad_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    newOrderCount: menu.new_order_count,
    newOrderRatio: returnZeroWhenZeroDivision(
      menu.new_order_count,
      menu.reorder_count + menu.new_order_count
    ),
    reorderCount: menu.reorder_count,
    reorderRatio: returnZeroWhenZeroDivision(
      menu.reorder_count,
      menu.reorder_count + menu.new_order_count
    ),
    newCustomerCount: menu.new_customer_count,
    newCustomerRatio: returnZeroWhenZeroDivision(
      menu.new_customer_count,
      menu.new_customer_count + menu.regular_customer_count
    ),
    regularCustomerCount: menu.regular_customer_count,
    regularCustomerRatio: returnZeroWhenZeroDivision(
      menu.regular_customer_count,
      menu.new_customer_count + menu.regular_customer_count
    ),
    favoriteCount: menu.favorite_count,
    clickCount: menu.click_count,
    storePostCount: menu.store_post_count,
    isDiscounted: menu.is_discounted,
    canBePicked: menu.can_be_picked,
    canBeReserved: menu.can_be_reserved,
    name: menu.name,
    price: menu.price,
    category: menu.category,
    storeId: menu.store_id,

    store: store,
    favorite: false,
  }
}
