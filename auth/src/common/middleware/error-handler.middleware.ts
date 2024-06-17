import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http-exception";

export function errorHandlerMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
