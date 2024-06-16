import { IsNumber } from "class-validator";
import { ParseNumber } from "../../common/decorators/parse-number";

export class DeleteUserParamsDto {
  @IsNumber()
  @ParseNumber()
  id!: number;
}
