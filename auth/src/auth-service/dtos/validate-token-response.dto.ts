import { IsInstance } from "class-validator";
import { SafeUserResponse } from "./safe-user-response.dto";

export class ValidateTokenResponseDto {
  @IsInstance(SafeUserResponse)
  safeUser!: SafeUserResponse;
}
