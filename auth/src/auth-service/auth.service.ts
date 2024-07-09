import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { HttpException } from '../common/exceptions/http-exception'
import { CONFIG } from '../common/config'
import { SafeUserResponseDto } from './dtos/safe-user-response.dto'
import { LoginUserResponseDto } from './dtos/login-user-response.dto'
import { UserService } from '../external-services/user/user.service'
import { objectToClassInstance } from '../common/utils/object-to-class-instance'
import { JwtService } from '../jwt-service/jwt-service'
import { PasswordService } from '../password-service/password-service'

export class AuthService {
  userService: UserService
  jwtService: JwtService
  passwordService: PasswordService

  constructor(userService: UserService, jwtService: JwtService, passwordService: PasswordService) {
    this.userService = userService
    this.jwtService = jwtService
    this.passwordService = passwordService
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.decodeJwt(token)
      const safeUser = await objectToClassInstance(SafeUserResponseDto, decoded)

      await this.userService.checkUserExistsAndReturn(safeUser.email)

      return safeUser
    } catch (error) {
      console.log('🚀 ~ AuthService ~ validateTokenDto ~ error:', error)
      if (error instanceof HttpException) throw error;
      throw new HttpException(403, 'Failed to authenticate token')
    }
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<LoginUserResponseDto> {
    try {
      const user = await this.userService.checkUserExistsAndReturn(email)

      await this.passwordService.checkPassword(password, user.password)

      const safeUser = await objectToClassInstance(SafeUserResponseDto, user, {
        excludeExtraneousValues: true,
      })

      const token = jwt.sign(
        JSON.parse(JSON.stringify(safeUser)),
        CONFIG.TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
      )

      return { token }
    } catch (error) {
      console.log(error)
      throw new HttpException(401, 'Authentication failed')
    }
  }
}
