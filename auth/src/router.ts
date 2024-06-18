import { Express, Request, Response } from "express";
import { Db } from "./db";
import { asyncHandler } from "./common/utils/async-handler";
import { FormatResponse } from "./common/utils/format-response";
import { bodyValidationMiddleware } from "./common/middleware";
import { AuthService } from "./auth-service/auth.service";
import { ValidateTokenDto } from "./auth-service/dtos/validate-token.dto";
import { ValidateTokenResponseDto } from "./auth-service/dtos/validate-token-response.dto";
import { LoginUserDto } from "./auth-service/dtos/login-user.dto";
import { LoginUserResponseDto } from "./auth-service/dtos/login-user-response.dto";

export const setupRoutes = (app: Express) => {
  const db = new Db();
  const authService = new AuthService(db);

  app.post(
    "/verify-token",
    bodyValidationMiddleware(ValidateTokenDto),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as ValidateTokenDto;
      const result = await authService.validateToken(body.token);

      res.send(FormatResponse(ValidateTokenResponseDto, { safeUser: result }));
    })
  );

  app.post(
    "/login-user",
    bodyValidationMiddleware(LoginUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as LoginUserDto;
      const result = await authService.loginUser(body.email, body.password);

      res.send(FormatResponse(LoginUserResponseDto, result));
    })
  );
};
