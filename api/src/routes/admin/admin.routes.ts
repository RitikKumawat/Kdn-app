import { JsonResponse } from "../../utils/jsonResponse";
import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { middleware } from "../middleware/index.middleware";
import { controllers } from "../../controllers";
import customerQuery from "./query/customer.query";
import transactionQuery from "./query/transaction.query";

export class AdminRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Admin Routes");
    this.app.use("/admin", middleware.adminAuth, this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", (req: Request, res: Response) => {
      return JsonResponse(res, {
        statusCode: 200,
        title: "admin api called",
        status: "success",
        message: "api called successfully",
      });
    });
    router.get("/get-profile", controllers.admin.getProfile);
    router.post("/logout", controllers.auth.adminLogout);
    customerQuery(router);
    transactionQuery(router);
    return this.app;
  }
}
