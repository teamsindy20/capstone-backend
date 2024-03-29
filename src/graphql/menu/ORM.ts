import { camelToSnake, returnZeroWhenZeroDivision } from '../../utils/commons'
import { Menu, MenuOption, MenuOptionCategory, MenuOptionCategoryType } from '../generated/graphql'
import { store } from '../store/ORM'

export const menu: Menu = {
  id: '',
  creationDate: '',
  modificationDate: '',
  name: '',
  price: 0,
  category: '',
  deliciousReviewCount: 0,
  deliciousReviewRatio: 0,
  fineReviewCount: 0,
  fineReviewRatio: 0,
  positiveReviewCount: 0,
  positiveReviewRatio: 0,
  badReviewCount: 0,
  badReviewRatio: 0,
  totalReviewCount: 0,
  newOrderCount: 0,
  newOrderRatio: 0,
  reorderCount: 0,
  reorderRatio: 0,
  totalOrderCount: 0,
  newCustomerCount: 0,
  newCustomerRatio: 0,
  regularCustomerCount: 0,
  regularCustomerRatio: 0,
  totalCustomerCount: 0,
  favoriteCount: 0,
  clickCount: 0,
  storePostCount: 0,
  isDiscounted: false,
  canBePicked: false,
  canBeReserved: false,
  storeId: '',
  categoryId: '',
  favorite: false,
  store: store,
}

export const menuOptionCategory: MenuOptionCategory = {
  id: '',
  creationDate: '',
  modificationDate: '',
  name: '',
  type: MenuOptionCategoryType.SingleSelection,
  isNecessary: false,
  menuId: '',
  menu: menu,
  menuOptions: [],
}

export const menuOption: MenuOption = {
  id: '',
  creationDate: '',
  modificationDate: '',
  name: '',
  price: 0,
  categoryId: '',
  category: menuOptionCategory,
}

export function menuFieldColumnMapping(menuField: keyof Menu) {
  switch (menuField) {
    case 'deliciousReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'fineReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'positiveReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'badReviewRatio':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'totalReviewCount':
      return ['delicious_review_count', 'fine_review_count', 'bad_review_count']
    case 'newOrderRatio':
      return ['reorder_count', 'new_order_count']
    case 'reorderRatio':
      return ['reorder_count', 'new_order_count']
    case 'totalOrderCount':
      return ['reorder_count', 'new_order_count']
    case 'newCustomerRatio':
      return ['new_customer_count', 'regular_customer_count']
    case 'regularCustomerRatio':
      return ['new_customer_count', 'regular_customer_count']
    case 'totalCustomerCount':
      return ['new_customer_count', 'regular_customer_count']
    case 'category':
      return 'category_id'
    case 'favorite':
      return 'id'
    case 'hashtags':
      return 'id'
    case 'optionCategories':
      return 'id'
    case 'store':
      return 'store_id'
    case 'theme':
      return 'theme_id'
    default:
      return camelToSnake(menuField)
  }
}

export function menuOptionCategoryFieldColumnMapping(
  menuOptionCategoryField: keyof MenuOptionCategory
) {
  switch (menuOptionCategoryField) {
    case 'menu':
      return 'menu_id'
    case 'menuOptions':
      return 'id'
    default:
      return camelToSnake(menuOptionCategoryField)
  }
}

export function menuOptionFieldColumnMapping(menuOptionField: keyof MenuOption) {
  switch (menuOptionField) {
    case 'category':
      return 'category_id'
    default:
      return camelToSnake(menuOptionField)
  }
}

export function menuORM(menu: Record<string, any>): Menu {
  return {
    id: menu.id,
    creationDate: menu.creation_date,
    modificationDate: menu.modification_date,
    name: menu.name,
    price: menu.price,
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
    positiveReviewCount: menu.delicious_review_count + menu.fine_review_count,
    positiveReviewRatio: returnZeroWhenZeroDivision(
      menu.delicious_review_count + menu.fine_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    badReviewCount: menu.bad_review_count,
    badReviewRatio: returnZeroWhenZeroDivision(
      menu.bad_review_count,
      menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count
    ),
    totalReviewCount: menu.delicious_review_count + menu.fine_review_count + menu.bad_review_count,
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
    totalOrderCount: menu.new_order_count + menu.reorder_count,
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
    totalCustomerCount: menu.new_customer_count + menu.regular_customer_count,
    favoriteCount: menu.favorite_count,
    clickCount: menu.click_count,
    storePostCount: menu.store_post_count,
    isDiscounted: menu.is_discounted,
    canBePicked: menu.can_be_picked,
    canBeReserved: menu.can_be_reserved,
    categoryId: menu.category_id,
    storeId: menu.store_id,
    content: menu.content,
    imageUrls: menu.image_urls,
    themeId: menu.theme_id,
    category: '',
    favorite: false,
    store: store,
  }
}

export function menuOptionCategoryORM(menuOptionCategory: Record<string, any>): MenuOptionCategory {
  return {
    id: menuOptionCategory.id,
    creationDate: menuOptionCategory.creation_date,
    modificationDate: menuOptionCategory.modification_date,
    name: menuOptionCategory.name,
    type: getMenuOptionCategoryType(menuOptionCategory.type),
    isNecessary: menuOptionCategory.is_necessary,
    menuId: menuOptionCategory.menu_id,
    menu: menu,
    menuOptions: [],
  }
}

function getMenuOptionCategoryType(type: string) {
  switch (type) {
    case '양자택일형':
      return MenuOptionCategoryType.BinarySelection
    case '단일선택형':
      return MenuOptionCategoryType.SingleSelection
    case '다중선택형':
      return MenuOptionCategoryType.MultiSelection
    case '서술형':
      return MenuOptionCategoryType.Text
    default:
      return MenuOptionCategoryType.SingleSelection
  }
}

export function menuOptionORM(menuOption: Record<string, any>): MenuOption {
  return {
    id: menuOption.id,
    creationDate: menuOption.creation_date,
    modificationDate: menuOption.modification_date,
    name: menuOption.name,
    price: menuOption.price,
    categoryId: menuOption.category_id,
    category: menuOptionCategory,
  }
}
