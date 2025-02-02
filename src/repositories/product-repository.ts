import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { getDbClient } from '../common/get-db-client'
import { HttpException } from '../common/exceptions/http-exception'
import { IProduct } from './interfaces/product.interface'

export class ProductRepository {
  private productsClient

  constructor() {
    this.productsClient = getDbClient().product
  }

  handleDbError(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta) {
        const properties = (error.meta.target as string[]).join(', ')
        throw new HttpException(409, `${properties} should be unique`)
      }
      if (error.code === 'P2025') throw new HttpException(404, `Product not found`)
    }
  }

  createProduct(product: IProduct) {
    return this.productsClient.create({ data: product })
  }
}
