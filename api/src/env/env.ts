import { config } from "dotenv";
config();

export const ENV = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_TOKEN: process.env.JWT_TOKEN,
};
