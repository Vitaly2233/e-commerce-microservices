import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class TokenUserDto {
  @Expose()
  @IsNumber()
  id!: number
}
