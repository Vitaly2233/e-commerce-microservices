import { Express, Request, Response } from "express";
import { UserService } from "./user-service/user.service";
import { UserDb } from "./user-db/user-db";
import { asyncHandler } from "./common/utils/async-handler";
import { FormatResponse } from "./common/utils/format-response";
import {
  DeleteUserParamsDto,
  FindOneUserParamsDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserParamsDto,
  UserResponseDto,
} from "./user-service/dto";
import {
  bodyValidationMiddleware,
  checkTokenMiddleware,
  paramsValidationMiddleware,
} from "./common/middleware";

export const setupRoutes = (app: Express) => {
  const userDb = new UserDb();
  const userService = new UserService(userDb);

  app.post(
    "/user/register",
    bodyValidationMiddleware(RegisterUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const dto = req.body as RegisterUserDto;

      await userService.registerUser(dto);

      res.statusCode = 201;
      res.send();
    })
  );

  app.get(
    "/user/me",
    checkTokenMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const currentUser = req.user;
      const result = await userService.findOne(currentUser.id);

      res.send(FormatResponse(UserResponseDto, result));
    })
  );

  app.get(
    "/user/:id",
    checkTokenMiddleware,
    paramsValidationMiddleware(UpdateUserParamsDto),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as any as FindOneUserParamsDto;

      const result = await userService.findOne(params.id);

      res.send(FormatResponse(UserResponseDto, result));
    })
  );

  app.get(
    "/user",
    checkTokenMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const result = await userService.findAllUsers();

      res.send(FormatResponse(UserResponseDto, result));
    })
  );

  app.patch(
    "/user/:id",
    paramsValidationMiddleware(UpdateUserParamsDto),
    bodyValidationMiddleware(UpdateUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as any as UpdateUserParamsDto;
      const dto = req.body as UpdateUserDto;

      await userService.updateUser(params.id, dto);

      res.statusCode = 204;
      res.send();
    })
  );

  app.delete(
    "/user/:id",
    paramsValidationMiddleware(DeleteUserParamsDto),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as any as DeleteUserParamsDto;

      await userService.deleteUser(params.id);

      res.statusCode = 201;
      res.send();
    })
  );
};
