import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import { Config } from "./configuration/Config";
import { AdminRoutes } from "./routes/admin/admin.routes";
import { CommonRoutesConfig } from "./routes/common/common.routes";
import { IndexRoutes } from "./routes/index/index.routes";
import { Server } from "socket.io";
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node"; // Add this for Vercel

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;
const routes: Array<CommonRoutesConfig> = [];

app.use(cors());
app.use(express.json());

app.set("rootDirectory", __dirname);
app.use("/uploads", express.static("uploads"));

routes.push(new AdminRoutes(app));
routes.push(new IndexRoutes(app));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server on Vercel!");
});

// **Export the handler for Vercel**
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
