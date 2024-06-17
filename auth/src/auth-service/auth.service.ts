import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { plainToInstance } from "class-transformer";
import { Db } from "../db";
import { HttpException } from "../common/exceptions/http-exception";
import { CONFIG } from "../common/config";

export class AuthService {
  db: Db;

  constructor(userDb: Db) {
    this.db = userDb;
  }
}
