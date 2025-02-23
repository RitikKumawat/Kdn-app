import { adminAuth, isSuperAdmin } from "./auth/adminAuth.middleware";

export const middleware = {
  adminAuth: adminAuth,
  isSuperAdmin: isSuperAdmin,
};
