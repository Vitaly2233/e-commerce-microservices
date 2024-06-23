import { Express, Request, Response } from "express";
import { asyncHandler } from "./common/utils/async-handler";
import { FormatResponse } from "./common/utils/format-response";
import {
  bodyValidationMiddleware,
  checkTokenMiddleware,
  internalOnlyMiddleware,
  paramsValidationMiddleware,
} from "./common/middleware";
import { queryValidationMiddleware } from "./common/middleware/query-validation.middleware";

export const setupRoutes = (app: Express) => {};
