import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDb } from "../user-db/user-db";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { HttpException } from "../common/exceptions/http-exception";
import { CONFIG } from "../common/config";
import { SafeUserResponse } from "./dto/safe-user-response.dto";
import { plainToInstance } from "class-transformer";
import { LoginUserResponseDto } from "./dto/login-user-response.dto";
import { IUser } from "../user-db/interfaces/user.interface";

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

  async loginUser(dto: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      const user = await this.db.findOne({ email: dto.email });

      const passwordMatch = await bcrypt.compare(dto.password, user.password);

      if (!passwordMatch) throw new Error("Password doesn't match");

      const safeUser = plainToInstance(SafeUserResponse, user, {
        excludeExtraneousValues: true,
      });

      const token = jwt.sign(
        JSON.parse(JSON.stringify(safeUser)),
        CONFIG.TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await this.updateUser(safeUser.id, { token });

      return { token };
    } catch (error) {
      console.log(error);
      throw new HttpException(401, "Authentication failed");
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
