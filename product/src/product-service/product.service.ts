import { HttpException } from "../common/exceptions/http-exception";
import { ProductDb } from "../product-db/product-db";
import { Product } from "./types/product.type";

export class ProductService {
  db: ProductDb;

  constructor(db: ProductDb) {
    this.db = db;
  }

  async createProduct(product: Product) {
    try {
      return this.db.createProduct(product);
    } catch (error) {
      this.db.handleDbError(error);
      console.log(error);
      throw new HttpException(505, "unknown error");
    }
  }
}
