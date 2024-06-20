import { IsEmail, IsOptional } from "class-validator";

export class GetUserQueryDto {
  @IsEmail()
  @IsOptional()
  email?: string;
}
