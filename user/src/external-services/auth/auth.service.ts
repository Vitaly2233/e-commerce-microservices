import axios, { AxiosInstance } from "axios";
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

  async verifyToken(token: string): Promise<ValidateTokenResponseDto> {
    try {
      const body: ValidateTokenDto = { token };
      const res = await this.api.post("verify-token", body);

      return res.data;
    } catch (error) {
      console.log("🚀 ~ AuthService ~ verifyToken ~ error:", error);
      throw new Error("invalid token");
    }
  }
}

export const authService = new AuthService();
