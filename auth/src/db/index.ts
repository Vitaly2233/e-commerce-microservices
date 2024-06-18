import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getDbClient } from "../common/get-db-client";
import { HttpException } from "../common/exceptions/http-exception";

//TODO remove this file entirely
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

  async findById(id: number) {
    try {
      return await this.usersClient.findFirstOrThrow({ where: { id } });
    } catch (error) {
      console.log(error);
      this.handleDbError(error);
      throw error;
    }
  }

  async findOne(user: any) {
    try {
      return await this.usersClient.findFirstOrThrow({ where: user });
    } catch (error) {
      console.log(error);
      this.handleDbError(error);
      throw error;
    }
  }

  async updateUser(id: number, data: any) {
    return this.usersClient.update({ data, where: { id } });
  }
}
