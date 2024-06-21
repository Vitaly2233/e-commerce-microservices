import axios, { AxiosError, AxiosInstance } from "axios";
import { CONFIG } from "../../common/config";
import { ValidateTokenDto } from "./dtos/validate-token.dto";
import { ValidateTokenResponseDto } from "./dtos/validate-token-response.dto";

class AuthService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.AUTH_SERVICE_BASE_URL,
      timeout: 1000,
    });
  }

  async validateToken(token: string): Promise<ValidateTokenResponseDto> {
    try {
      const body: ValidateTokenDto = { token };
      const res = await this.api.post("validate-token", body);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.message);
        console.log(error?.response?.data);
      }
      throw new Error("Not found");
    }
  }
}

export const authService = new AuthService();
