import { IsEmail } from 'class-validator'

export class GetUserQueryDto {
  @IsEmail()
  email!: string
}
