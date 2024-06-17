import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { CONFIG } from "../config";
import { SafeUserResponse } from "../../user-service/dto/safe-user-response.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpException } from "../exceptions/http-exception";

export function checkTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpException(401, "No token provided"));

  jwt.verify(token, CONFIG.TOKEN_SECRET, async (err, decoded) => {
    try {
      if (err) throw err;
      if (!decoded) throw new Error("Decoded data not found");

      const safeUser = plainToInstance(SafeUserResponse, decoded);

      const errors = await validate(safeUser, { whitelist: true });

      if (errors.length > 0) {
        throw new Error(errors.map((err) => err.toString()).join(","));
      }

      req.user = safeUser;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return next(new HttpException(401, error.message));
      }
      return next(new HttpException(403, "Failed to authenticate token"));
    }
  });
}
