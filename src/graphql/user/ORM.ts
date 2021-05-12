import { User } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'

export const user: User = {
  id: '',
  creationDate: '',
  modificationDate: '',
  email: '',
  point: 0,
}

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
    case 'preferences':
      return ''
    case 'regularStores':
      return ''
    default:
      return camelToSnake(userField)
  }
}

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
    representativeDeliveryAddress:
      user.representative_delivery_address &&
      user.delivery_addresses[user.representative_delivery_address],
  }
}
