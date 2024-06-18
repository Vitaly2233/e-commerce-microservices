import { Expose } from "class-transformer";
import { ISafeUserResponse } from "../../common/interfaces/safe-user-response.interface";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class SafeUserResponse implements ISafeUserResponse {
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
