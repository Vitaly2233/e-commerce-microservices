import bcrypt from 'bcrypt'
import { RegisterUserDto, UpdateUserDto } from './dto'
import { IUser } from '../../repositories/interfaces/user.interface'
import { UserRepository } from '../../repositories/user-repository'
import { HttpException } from '../../common/exceptions/http-exception'

export class UserService {
  db: UserRepository

  constructor(userDb: UserRepository) {
    this.db = userDb
  }

  async registerUser(dto: RegisterUserDto): Promise<void> {
    dto.password = await bcrypt.hash(dto.password, 10)
    await this.db.createUser(dto)
  }

  findOne(id: number): Promise<IUser> {
    return this.db.findById(id)
  }

  findByEmail(email: string): Promise<IUser> {
    return this.db.findByEmail(email)
  }

  findAllUsers(): Promise<IUser[]> {
    return this.db.findAllUsers()
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<void> {
    await this.db.updateUser(id, dto)
  }

  async deleteUser(id: number): Promise<void> {
    await this.db.deleteUser(id)
  }

  async checkUserExistsAndReturn(email: string): Promise<IUser> {
    const user = await this.findByEmail(email)
    if (!user) throw new HttpException(404, 'user not found')

    return user
  }
}
