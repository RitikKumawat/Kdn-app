import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Config } from "./configuration/Config";
import { AdminRoutes } from "./routes/admin/admin.routes";
import { CommonRoutesConfig } from "./routes/common/common.routes";
import { IndexRoutes } from "./routes/index/index.routes";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 4000;
const routes: Array<CommonRoutesConfig> = [];

app.enable("trust proxy");
app.use(cors());
app.use(express.json());

routes.push(new AdminRoutes(app));
routes.push(new IndexRoutes(app));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

// ⚡ Export as a Serverless API
export default app;
