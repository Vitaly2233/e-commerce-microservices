import { IsInstance } from "class-validator";
import { SafeUserResponseDto } from "./safe-user-response.dto";

export class ValidateTokenResponseDto {
  @IsInstance(SafeUserResponseDto)
  safeUser!: SafeUserResponseDto;
}
