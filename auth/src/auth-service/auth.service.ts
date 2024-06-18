import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { plainToInstance } from "class-transformer";
import { Db } from "../db";
import { HttpException } from "../common/exceptions/http-exception";
import { CONFIG } from "../common/config";
import { SafeUserResponse } from "./dtos/safe-user-response.dto";
import { validate } from "class-validator";
import { LoginUserResponseDto } from "./dtos/login-user-response.dto";

export class AuthService {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, CONFIG.TOKEN_SECRET);
      if (!decoded) throw new Error("Decoded data not found");

      const safeUser = plainToInstance(SafeUserResponse, decoded);
      const errors = await validate(safeUser, { whitelist: true });
      if (errors.length > 0) {
        throw new Error(errors.map((err) => err.toString()).join(","));
      }

      const user = await this.db.findById(safeUser.id);
      if (!user) throw new Error("user not found");

      return safeUser;
    } catch (error) {
      console.log("🚀 ~ AuthService ~ validateTokenDto ~ error:", error);
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(401, error.message);
      }
      throw new HttpException(403, "Failed to authenticate token");
    }
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<LoginUserResponseDto> {
    try {
      const user = await this.db.findOne({ email });

      const passwordMatch = await bcrypt.compare(password, user.password);

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

      await this.db.updateUser(safeUser.id, { token });

      return { token };
    } catch (error) {
      console.log(error);
      throw new HttpException(401, "Authentication failed");
    }
  }
}
