import bcrypt from "bcrypt";
import { UserDb } from "../user-db/user-db";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UserService {
  db: UserDb;

  constructor(userDb: UserDb) {
    this.db = userDb;
  }

  async registerUser(dto: RegisterUserDto) {
    try {
      dto.password = await bcrypt.hash(dto.password, 10);
      await this.db.createUser(dto);
    } catch (error) {
      console.log(error);
      this.db.handleDbError(error);
    }
  }

  async findOne(id: number) {
    return this.db.findById(id);
  }

  findAllUsers() {
    return this.db.findAllUsers();
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<void> {
    try {
      await this.db.updateUser(id, dto);
    } catch (error) {
      console.log(error);
      this.db.handleDbError(error);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.db.deleteUser(id);
    } catch (error) {
      console.log(error);
      this.db.handleDbError(error);
    }
  }
}
