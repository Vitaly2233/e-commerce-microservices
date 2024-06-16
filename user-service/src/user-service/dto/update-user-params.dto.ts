import { IsNumber } from "class-validator";
import { ParseNumber } from "../../common/decorators/parse-number";

export class UpdateUserParamsDto {
  @IsNumber()
  @ParseNumber()
  id!: number;
}
