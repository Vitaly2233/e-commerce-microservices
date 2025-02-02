import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/http-exception'
import { CONFIG } from '../config'
import { AuthService } from '../../services/auth/auth.service'

export function checkTokenMiddleware(authService: AuthService) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (typeof req.headers.authorization !== 'string') throw new HttpException(403, 'Failed to authenticate token')
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return next(new HttpException(401, 'No token provided'))

    if (token === CONFIG.INTERNAL_SERVICE_TOKEN_SECRET) return next()

    try {
      req.user = await authService.validateToken(token)
      next()
    } catch (error) {
      console.log('🚀 ~ error:', error)
      return next(new HttpException(403, 'Failed to authenticate token'))
    }
  }
}
