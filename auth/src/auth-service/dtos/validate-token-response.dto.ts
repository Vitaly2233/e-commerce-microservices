import { IsBoolean } from "class-validator";
import { SafeUserResponse } from "./safe-user-response.dto";

export class ValidateTokenResponseDto {
  @IsBoolean()
  safeUser!: SafeUserResponse;
}
