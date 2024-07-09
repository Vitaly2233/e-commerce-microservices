import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { getDbClient } from '../common/get-db-client'
import { IUpdateUser } from './interfaces/update-user-interface'
import { IUser } from './interfaces/user.interface'
import { HttpException } from '../common/exceptions/http-exception'

export class UserDb {
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
      if (error.code === 'P2025' || error.code === 'P2021')
        throw new HttpException(404, `User not found`)
    }
  }

  async createUser(data: IUser): Promise<IUser> {
    try {
      return this.usersClient.create({
        data,
      })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async findById(id?: number, email?: string): Promise<IUser> {
    try {
      return await this.usersClient.findFirstOrThrow({ where: { id, email } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async findAllUsers(): Promise<IUser[]> {
    try {
      return this.usersClient.findMany()
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async updateUser(id: number, data: IUpdateUser): Promise<IUser> {
    try {
      return this.usersClient.update({ data, where: { id } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }

  async deleteUser(id: number): Promise<IUser> {
    try {
      return this.usersClient.delete({ where: { id } })
    } catch (error) {
      console.log(error)
      this.handleDbError(error)
      throw error
    }
  }
}
