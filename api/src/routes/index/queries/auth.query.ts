import { Router } from "express";
import { controllers } from "../../../controllers";
import { validateBody } from "../../../utils/validateBody.utils";
import { schemas } from "../../../schemas/index.schema";

export const authQuery = (router: Router) => {
  router.post(
    "/auth/admin-login",
    validateBody(schemas.adminLogin),
    controllers.auth.adminLogin
  );
};
