import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

export const getDbClient = () => {
  return dbClient;
};
