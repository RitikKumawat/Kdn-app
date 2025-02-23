import mongoose from "mongoose";
import fs from "fs";
import { ENV } from "../env/env";

export class Config {
  async start() {
    try {
      // Connect to mondoDb
      await this.dbConnect(ENV.MONGO_DB_URL ?? "");
      console.log("mongodb", ENV.MONGO_DB_URL);
    } catch (error: any) {
      console.error("OOPS! ", error);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url, {
        serverSelectionTimeoutMS: 30000,
      });
      console.log("Connected to DB");
    } catch (error: any) {
      console.error("DB Connection Error ", error);
    }
  }
}
