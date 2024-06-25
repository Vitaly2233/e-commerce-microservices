import { Expose } from "class-transformer";
import { SafeUserResponse } from "../../common/types/safe-user-response.type";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class SafeUserResponseDto implements SafeUserResponse {
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
