import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class SafeUserResponse {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsString()
  username?: string;

  @Expose()
  @IsEmail()
  email!: string;
}
