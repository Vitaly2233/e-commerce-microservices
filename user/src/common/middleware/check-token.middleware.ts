import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http-exception";
import { authService } from "../../external-services/auth/auth.service";

export async function checkTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpException(401, "No token provided"));

  try {
    const result = await authService.verifyToken(token);
    if (!result.safeUser) {
      return new HttpException(403, "Failed to authenticate token");
    }

    req.user = result.safeUser;
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return next(new HttpException(403, "Failed to authenticate token"));
  }
}
