import jwt from 'jsonwebtoken'
import { JwtService } from './jwt-service'
import { PasswordService } from '../password/password-service'
import { UserService } from '../user/user.service'
import { HttpException } from '../../common/exceptions/http-exception'
import { CONFIG } from '../../common/config'
import { objectToClassInstance } from '../../common/utils/object-to-class-instance'
import { TokenUserDto } from './dtos/token-user-dto'

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
    const decoded = this.jwtService.decodeJwt(token)
    const userTokenData = await objectToClassInstance(TokenUserDto, decoded)

    const foundUser = await this.userService.findOne(userTokenData.id)
    if (!foundUser) throw new HttpException(403, 'Failed to authenticate token')

    return foundUser
  }

  async loginUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.userService.checkUserExistsAndReturn(email)

      await this.passwordService.checkPassword(password, user.password)

      const tokenUserData = await objectToClassInstance(TokenUserDto, user, {
        excludeExtraneousValues: true,
      })

      return jwt.sign(JSON.parse(JSON.stringify(tokenUserData)), CONFIG.TOKEN_SECRET, {
        expiresIn: '1d',
      })
    } catch (error) {
      console.log(error)
      throw new HttpException(401, 'Authentication failed')
    }
  }
}
