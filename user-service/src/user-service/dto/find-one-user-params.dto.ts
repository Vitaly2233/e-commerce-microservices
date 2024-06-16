import { IsNumber } from "class-validator";
import { ParseNumber } from "../../common/decorators/parse-number";

export class FindOneUserParamsDto {
  @IsNumber()
  @ParseNumber()
  id!: number;
}
