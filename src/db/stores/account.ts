import Datastore from "nedb-promises";
import Account from "../schemas/account";
import { validate, ValidationError } from "class-validator";

class AccountStore {
  db: Datastore;

  constructor(collection: string) {
    const dbPath = `${process.cwd()}/${collection}.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  async create(data: Account): Promise<Account> {
    const error: ValidationError[] = await validate(data);
    if (error && error.length > 0) {
      throw error;
    }

    return this.db.insert(data);
  }

  async read(_id: string): Promise<Account> {
    const account: Account = await this.db.findOne({ _id });
    return account;
  }

  async readAll(): Promise<Account[]> {
    return await this.db.find({});
  }
}

export default new AccountStore("users");
