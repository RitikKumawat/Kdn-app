import { JsonResponse } from "../../utils/jsonResponse";
import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { authQuery } from "./queries/auth.query";
export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Index Routes");
    this.app.use("/", this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", (req: Request, res: Response) => {
      return JsonResponse(res, {
        statusCode: 200,
        title: "Index api called",
        status: "success",
        message: "api called successfully",
      });
    });

    authQuery(router);

    return this.app;
  }
}
