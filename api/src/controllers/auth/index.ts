import { asyncWrapper } from "../../wrapper/asyncWrapper";
import { adminLogin } from "./adminLogin.controller";
import { adminLogout } from "./adminLogout.controller";

export const authController = {
  adminLogin: asyncWrapper(adminLogin),
  adminLogout: asyncWrapper(adminLogout),
};
