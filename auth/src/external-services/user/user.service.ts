import axios, { AxiosError, AxiosInstance } from "axios";
import { CONFIG } from "../../common/config";
import { UserResponseDto } from "./dtos/user-response.dto";
import { FindOneUserParamsDto } from "./dtos/find-one-user-params.dto";
import { UpdateUserDto } from "../../auth-service/dtos/update-user.dto";

export class UserService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.USER_SERVICE_BASE_URL,
      timeout: 1000,
      headers: {
        Authorization: `${CONFIG.INTERNAL_SERVICE_TOKEN_SECRET}`,
      },
    });
  }

  async findById(id: number): Promise<UserResponseDto> {
    const result = await this.api.get(`user/${id}`);

    return result.data;
  }

  async findOne(params: FindOneUserParamsDto) {
    try {
      const result = await this.api.get(`user/unsafe`, {
        params,
        headers: {
          Authorization: `Bearer ${CONFIG.INTERNAL_SERVICE_TOKEN_SECRET}`,
        },
      });

      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
      throw new Error("Not found");
    }
  }

  async updateOne(id: number | string, data: UpdateUserDto) {
    const result = await this.api.patch(`user/${id}`, data);

    return result.data;
  }
}
