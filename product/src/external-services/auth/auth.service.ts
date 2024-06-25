import axios, { AxiosError, AxiosInstance } from "axios";
import { CONFIG } from "../../common/config";
import { ValidateTokenBody } from "./types/validate-token-body";
import { ValidateTokenResponse } from "./types/validate-token-response";

class AuthService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.AUTH_SERVICE_BASE_URL,
      timeout: 1000,
    });
  }

  async validateToken(token: string): Promise<ValidateTokenResponse> {
    try {
      const body: ValidateTokenBody = { token };
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
