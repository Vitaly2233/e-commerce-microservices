import { Expose } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class UnsafeUserResponseDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id!: number

  @Expose()
  @IsString()
  username!: string

  @Expose()
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}
