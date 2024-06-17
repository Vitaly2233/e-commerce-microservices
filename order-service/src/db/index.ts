import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getDbClient } from "../common/get-db-client";
import { HttpException } from "../common/exceptions/http-exception";

export class Db {
  usersClient;

  constructor() {
    this.usersClient = getDbClient().users;
  }

  handleDbError(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002" && error.meta) {
        const properties = (error.meta.target as string[]).join(", ");
        throw new HttpException(409, `${properties} should be unique`);
      }
      if (error.code === "P2025")
        throw new HttpException(404, `User not found`);
    }
  }
}
