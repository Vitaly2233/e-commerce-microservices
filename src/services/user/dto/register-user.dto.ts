import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  username!: string

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password!: string

  @IsEmail()
  @IsString()
  email!: string
}
