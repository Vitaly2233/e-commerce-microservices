import { Express, Request, Response } from "express";
import { asyncHandler } from "./common/utils/async-handler";
import { FormatResponse } from "./common/utils/format-response";
import {
  bodyValidationMiddleware,
  checkTokenMiddleware,
  paramsValidationMiddleware,
} from "./common/middleware";
import { Db } from "./db";
import { OrderService } from "./order-service/order.service";

export const setupRoutes = (app: Express) => {
  const db = new Db();
  const orderService = new OrderService(db);
};
