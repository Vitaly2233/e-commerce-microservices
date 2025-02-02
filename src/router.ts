import { Express, Request, Response } from 'express'
import { UserService } from './services/user/user.service'
import { asyncHandler } from './common/utils/async-handler'
import { FormatResponse } from './common/utils/format-response'
import {
  DeleteUserParamsDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserParamsDto,
  UserResponseDto,
} from './services/user/dto'
import {
  bodyValidationMiddleware,
  checkTokenMiddleware,
  paramsValidationMiddleware,
} from './common/middleware'
import { CreateProductDto } from './services/product/dtos/create-product.dto'
import { AuthService } from './services/auth/auth.service'
import { PasswordService } from './services/password/password-service'
import { JwtService } from './services/auth/jwt-service'
import { ProductService } from './services/product/product.service'
import { LoginUserDto } from './services/auth/dtos/login-user.dto'
import { LoginUserResponseDto } from './services/auth/dtos/login-user-response.dto'
import { UserRepository } from './repositories/user-repository'
import { ProductRepository } from './repositories/product-repository'

export const setupRoutes = (app: Express) => {
  const userRepository = new UserRepository()
  const productRepository = new ProductRepository()
  const userService = new UserService(userRepository)
  const jwtService = new JwtService()
  const passwordService = new PasswordService()
  const authService = new AuthService(userService, jwtService, passwordService)
  const productService = new ProductService(productRepository)

  app.post(
    '/user/register',
    bodyValidationMiddleware(RegisterUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const dto = req.body as RegisterUserDto

      await userService.registerUser(dto)

      res.statusCode = 201
      res.send()
    }),
  )

  app.post(
    '/login',
    bodyValidationMiddleware(LoginUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as LoginUserDto
      const result = await authService.loginUser(body.email, body.password)

      res.send(FormatResponse(LoginUserResponseDto, { token: result }))
    }),
  )

  app.get(
    '/user/me',
    checkTokenMiddleware(authService),
    asyncHandler(async (req: Request, res: Response) => {
      const currentUser = req.user
      const result = await userService.findOne(currentUser.id)

      res.send(FormatResponse(UserResponseDto, result))
    }),
  )

  app.get(
    '/users',
    checkTokenMiddleware(authService),
    asyncHandler(async (_req: Request, res: Response) => {
      const result = await userService.findAllUsers()

      res.send(FormatResponse(UserResponseDto, result))
    }),
  )

  app.patch(
    '/user/:id',
    checkTokenMiddleware(authService),
    paramsValidationMiddleware(UpdateUserParamsDto),
    bodyValidationMiddleware(UpdateUserDto),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as any as UpdateUserParamsDto
      const dto = req.body as UpdateUserDto

      await userService.updateUser(params.id, dto)

      res.statusCode = 204
      res.send()
    }),
  )

  app.delete(
    '/user/:id',
    checkTokenMiddleware(authService),
    paramsValidationMiddleware(DeleteUserParamsDto),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as any as DeleteUserParamsDto

      await userService.deleteUser(params.id)

      res.statusCode = 201
      res.send()
    }),
  )

  app.post(
    '/product',
    checkTokenMiddleware(authService),
    bodyValidationMiddleware(CreateProductDto),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as CreateProductDto
      await productService.createProduct(body)

      res.statusCode = 201
      res.send()
    }),
  )
}
