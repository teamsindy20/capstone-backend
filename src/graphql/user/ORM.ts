import { User } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'

// Only not null GraphQL fields
export const user: User = {
  id: '',
  creationDate: '',
  modificationDate: '',
  email: '',
  point: 0,
}

// All database columns -> All GraphQL Fields except nullable fields that must fetch from other table
export function userORM(user: any): User {
  return {
    id: user.id,
    creationDate: user.creation_date,
    modificationDate: user.modification_date,
    email: user.email,
    point: user.point,
    name: user.name,
    phoneNumber: user.phone_number,
    gender: user.gender,
    birthDate: user.birth_date,
    imageUrls: user.image_urls,
    deliveryAddresses: user.delivery_addresses,
    representativeDeliveryAddress: user.delivery_addresses[user.representative_delivery_address],
  }
}

// All GraphQL fields -> All database columns
// GraphQL fields that must fetch from other table -> 'table_id' | ''
// __typename -> ''
export function userFieldColumnMapping(userField: keyof User) {
  switch (userField) {
    case 'representativeDeliveryAddress':
      return ['representative_delivery_address', 'delivery_addresses']
    case 'favoriteMenus':
      return ''
    case 'favoriteStores':
      return ''
    case 'orders':
      return ''
    case 'preference':
      return ''
    case 'regularStores':
      return ''
    case '__typename':
      return ''
    default:
      return camelToSnake(userField)
  }
}
