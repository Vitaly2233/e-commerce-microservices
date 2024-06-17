import { Exclude } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @Exclude()
  token?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
}
