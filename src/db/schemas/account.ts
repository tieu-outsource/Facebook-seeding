import { Length } from "class-validator";

export class Account {
  @Length(3, 10)
  username: string;

  @Length(3, 20)
  password: string;

  twoFaCode: string;

  cookie: string;
}

export default Account;
