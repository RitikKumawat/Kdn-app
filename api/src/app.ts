import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import { Config } from "./configuration/Config";
import { AdminRoutes } from "./routes/admin/admin.routes";
import { CommonRoutesConfig } from "./routes/common/common.routes";
import { IndexRoutes } from "./routes/index/index.routes";
import { Server } from "socket.io";
import path from "path";
// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 4000;
const routes: Array<CommonRoutesConfig> = [];
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.enable("trust proxy");

// **CORS middleware** - Apply before defining routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.set("rootDirectory", __dirname);
app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static("uploads"));
// app.use("/images", express.static("images"));

routes.push(new AdminRoutes(app));
routes.push(new IndexRoutes(app));
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

const runningMessage = `Server running at http://localhost:${port}`;

app.listen(port,()=>{
  console.log("Server running on ",port);
  routes.forEach((route:CommonRoutesConfig)=>{
    console.log("ROUTES CONFIGURED FOR",route.getName());
  })
})
// new Config()
//   .start()
//   .then(() => {
//     server.listen(port, () => {
//       console.log(runningMessage);

//       routes.forEach((route: CommonRoutesConfig) => {
//         console.log(`Routes configured for ${route.getName()}`);
//       });
//     });
//   })
//   .catch((error) => {
//     console.log("Config Error ", error);
//   });