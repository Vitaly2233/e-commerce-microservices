import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function bodyValidationMiddleware(
  type: any
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dto = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dto, { whitelist: true });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join("; ");
      res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
    } else {
      req.body = dto;
      next();
    }
  };
}
