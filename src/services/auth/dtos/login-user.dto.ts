import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password!: string

  @IsEmail()
  @IsString()
  email!: string
}
