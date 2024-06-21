import axios, { AxiosError, AxiosInstance } from "axios";
import { CONFIG } from "../../common/config";
import { FindOneUserParamsDto } from "./dtos/find-one-user-params.dto";
import { UserResponse } from "./types/user-response.type";

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

  async findOne(params: FindOneUserParamsDto): Promise<UserResponse> {
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
        console.log(error?.message);
        console.log(error?.response?.data);
      }
      throw new Error("Not found");
    }
  }
}
