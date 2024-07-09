import axios, { AxiosError, AxiosInstance } from 'axios'
import { CONFIG } from '../../common/config'
import { FindOneUserParamsDto } from './dtos/find-one-user-params.dto'
import { UnsafeUserResponse } from './types/unsafe-user-response.type'

export class UserService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.USER_SERVICE_BASE_URL,
      timeout: 5000,
      headers: {
        Authorization: `${CONFIG.INTERNAL_SERVICE_TOKEN_SECRET}`,
      },
    })
  }

  async findOne(params: FindOneUserParamsDto): Promise<UnsafeUserResponse> {
    try {
      const result = await this.api.get(`user/unsafe`, {
        params,
        headers: {
          Authorization: `Bearer ${CONFIG.INTERNAL_SERVICE_TOKEN_SECRET}`,
        },
      })

      return result.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.message)
        console.log(error?.response?.data)
      }
      throw new Error('Not found')
    }
  }

  async checkUserExistsAndReturn(email: string): Promise<UnsafeUserResponse> {
    const user = await this.findOne({ email })
    if (!user) throw new Error('user not found')

    return user
  }
}
