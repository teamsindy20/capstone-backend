import { ApolloError } from 'apollo-server-express'

export class DatabaseQueryError extends ApolloError {
  constructor(message: string) {
    super(message, 'DATABASE_QUERY_ERROR')
  }
}

export class JWTGenerationError extends ApolloError {
  constructor(message: string) {
    super(message, 'JWT_GENERATION_ERROR')
  }
}

export class BcryptError extends ApolloError {
  constructor(message: string) {
    super(message, 'BCRYPT_ERROR')
  }
}
