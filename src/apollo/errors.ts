import { ApolloError } from 'apollo-server'
import { BCRYPT_ERROR, DATABASE_ERROR, JWT_GENERATION_ERROR } from 'src/common/errors'

export class DatabaseError extends ApolloError {
  constructor(message: string) {
    super(message, `${DATABASE_ERROR}`)
  }
}

export class JWTGenerationError extends ApolloError {
  constructor(message: string) {
    super(message, `${JWT_GENERATION_ERROR}`)
  }
}

export class BcryptError extends ApolloError {
  constructor(message: string) {
    super(message, `${BCRYPT_ERROR}`)
  }
}
