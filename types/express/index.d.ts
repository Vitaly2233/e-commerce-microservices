import { IUser } from '../../src/repositories/interfaces/user.interface'

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser
  }
}
