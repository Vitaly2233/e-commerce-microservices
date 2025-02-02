import { HttpException } from '../../common/exceptions/http-exception'
import { ProductRepository } from '../../repositories/product-repository'
import { CreateProductDto } from './dtos/create-product.dto'

export class ProductService {
  db: ProductRepository

  constructor(db: ProductRepository) {
    this.db = db
  }

  async createProduct(product: CreateProductDto) {
    try {
      return this.db.createProduct(product)
    } catch (error) {
      this.db.handleDbError(error)
      console.log(error)
      throw new HttpException(505, 'unknown error')
    }
  }
}
