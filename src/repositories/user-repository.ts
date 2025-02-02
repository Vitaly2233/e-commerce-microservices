import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { getDbClient } from '../common/get-db-client'
import { HttpException } from '../common/exceptions/http-exception'
import { IUser } from './interfaces/user.interface'
import { IUpdateUser } from './interfaces/update-user-interface'
import { ICreateUser } from './interfaces/create-user.interface'

export class UserRepository {
  usersClient

  constructor() {
    this.usersClient = getDbClient().user
  }

  handleDbError(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta) {
        const properties = (error.meta.target as string[]).join(', ')
        throw new HttpException(409, `${properties} should be unique`)
      }
      if (error.code === 'P2025' || error.code === 'P2021') throw new HttpException(404, `User not found`)
    }
  }

  async createUser(data: ICreateUser): Promise<IUser> {
    try {
      return await this.usersClient.create({
        data,
      })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async findById(id?: number): Promise<IUser> {
    try {
      return await this.usersClient.findFirstOrThrow({ where: { id } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async findByEmail(email?: string): Promise<IUser> {
    try {
      return await this.usersClient.findFirstOrThrow({ where: { email } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async findAllUsers(): Promise<IUser[]> {
    try {
      return await this.usersClient.findMany()
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async updateUser(id: number, data: IUpdateUser): Promise<IUser> {
    try {
      return await this.usersClient.update({ data, where: { id } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async deleteUser(id: number): Promise<IUser> {
    try {
      return await this.usersClient.delete({ where: { id } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }
}
