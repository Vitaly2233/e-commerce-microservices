import { SafeUserResponse } from "../../src/common/types/safe-user-response.type";

declare module "express-serve-static-core" {
  interface Request {
    user: SafeUserResponse;
  }
}
