import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginUserResponseDto {
  @Expose()
  @IsString()
  token!: string;
}
