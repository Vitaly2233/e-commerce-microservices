import bcrypt from 'bcrypt'
import { UserDb } from '../user-db/user-db'
import { RegisterUserDto, UpdateUserDto } from './dto'
import { IUser } from '../user-db/interfaces/user.interface'

export class UserService {
  db: UserDb

  constructor(userDb: UserDb) {
    this.db = userDb
  }

  async registerUser(dto: RegisterUserDto): Promise<void> {
    dto.password = await bcrypt.hash(dto.password, 10)
    await this.db.createUser(dto)
  }

  findOne(id?: number, email?: string): Promise<IUser> {
    return this.db.findById(id, email)
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
}
