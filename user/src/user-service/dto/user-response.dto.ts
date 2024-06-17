import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserResponseDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id!: number;

  @Expose()
  @IsString()
  username!: string;

  @Expose()
  @IsEmail()
  email!: string;
}
