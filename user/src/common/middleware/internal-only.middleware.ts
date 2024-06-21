import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http-exception";
import { CONFIG } from "../config";

export async function internalOnlyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpException(401, "No token provided"));

  if (token === CONFIG.INTERNAL_SERVICE_TOKEN_SECRET) return next();
  return next(new HttpException(403, "Failed to authenticate token"));
}
