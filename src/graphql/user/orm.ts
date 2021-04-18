export function userORM(user: any) {
  return {
    id: user.id,
    creationDate: user.creation_date,
    modificationDate: user.modification_date,
    point: user.point,
    email: user.email,
    imageUrl: user.image_url,
    name: user.name,
    phoneNumber: user.phone_number,
    gender: user.gender,
    birthDate: user.birth_date,
    address: user.address,
  }
}
