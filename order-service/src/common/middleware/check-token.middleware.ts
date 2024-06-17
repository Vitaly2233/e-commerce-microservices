import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { SafeUserResponse } from "../../user-service/dto/safe-user-response.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function checkTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

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
      console.log(error);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
  });
}
