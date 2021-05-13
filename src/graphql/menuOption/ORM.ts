import { MenuOption } from '../generated/graphql'
import { camelToSnake } from '../../utils/commons'
import { menu } from '../menu/ORM'

export const menuOption: MenuOption = {
  id: '',
  creationDate: '',
  modificationDate: '',
  name: '',
  price: 0,
  menuId: '',
  menu: menu,
}

export function menuOptionFieldColumnMapping(menuOptionField: keyof MenuOption) {
  switch (menuOptionField) {
    case 'menu':
      return 'menu_id'
    default:
      return camelToSnake(menuOptionField)
  }
}

export function menuOptionORM(menuOption: Record<string, any>): MenuOption {
  return {
    id: menuOption.id,
    creationDate: menuOption.creation_date,
    modificationDate: menuOption.modification_date,
    name: menuOption.name,
    price: menuOption.price,
    menuId: menuOption.menu_id,
    menu: menu,
  }
}
