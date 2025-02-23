import { Router } from "express";
import { controllers } from "../../../controllers";
import { middleware } from "../../middleware/index.middleware";

export default (router: Router) => {
  router.post("/add-transaction", controllers.transaction.addTransaction);
  router.post("/get-transaction", controllers.transaction.getTransaction);
  router.get(
    "/get-analytic-transaction",
    middleware.isSuperAdmin,
    controllers.transaction.getAnalytics
  );
};
