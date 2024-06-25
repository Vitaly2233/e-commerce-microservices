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
import { CreateProductDto } from "./product-service/dtos/create-product.dto";
import { ProductService } from "./product-service/product.service";
import { ProductDb } from "./product-db/product-db";

export const setupRoutes = (app: Express) => {
  const db = new ProductDb();
  const productService = new ProductService(db);

  app.post(
    "/product",
    checkTokenMiddleware,
    bodyValidationMiddleware(CreateProductDto),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as CreateProductDto;
      await productService.createProduct(body);

      res.statusCode = 201;
      res.send();
    })
  );
};
