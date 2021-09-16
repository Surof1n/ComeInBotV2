import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(__dirname, "../..", ".env") });

export const CiOptions = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
};
