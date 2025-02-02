import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { CONFIG } from '../../common/config'
import { HttpException } from '../../common/exceptions/http-exception'

export class JwtService {
  decodeJwt(token: string): any {
    let decoded
    try {
      decoded = jwt.verify(token, CONFIG.TOKEN_SECRET)
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(401, error.message)
      }
      throw error
    }
    if (!decoded) throw new Error('Cannot decode jwt token with the given token')
    return decoded
  }
}
