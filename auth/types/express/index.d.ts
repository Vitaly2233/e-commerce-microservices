import { SafeUserResponse } from "../../src/user-service/dto/safe-user-response.dto";

declare module "express-serve-static-core" {
  interface Request {
    user: SafeUserResponse;
  }
}
