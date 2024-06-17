import { plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";
import { HttpException } from "../exceptions/http-exception";

export const FormatResponse = (dto: any, result: any | any[]) => {
  const dtos: { [key: string]: any }[] = Array.isArray(result)
    ? result.map((res) => plainToInstance(dto, res))
    : [plainToInstance(dto, result)];

  for (const dto of dtos) {
    const errors: ValidationError[] = validateSync(dto, {
      whitelist: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join("; ");
      throw new HttpException(
        500,
        `Invalid response from server;${errorMessages}`
      );
    }
  }

  return Array.isArray(result) ? dtos : dtos[0];
};
