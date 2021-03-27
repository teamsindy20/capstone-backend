import { ApolloError } from 'apollo-server-express'

export class MyError extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE')

    Object.defineProperty(this, 'name', { value: 'MyError' })
  }
}

export class MyError2 extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE_2')

    Object.defineProperty(this, 'name2', { value: 'MyError2' })
  }
}
