import { IsBoolean } from "class-validator";
import { SafeUserResponse } from "../../../user-service/dto/safe-user-response.dto";

export class ValidateTokenResponseDto {
  @IsBoolean()
  safeUser!: SafeUserResponse;
}
