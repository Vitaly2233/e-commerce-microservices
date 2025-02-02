import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string
}
