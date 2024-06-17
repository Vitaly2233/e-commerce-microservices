import { Db } from "../db";

export class OrderService {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }
}
