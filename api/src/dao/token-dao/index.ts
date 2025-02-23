import { createToken } from "./create-token.dao";
import deleteTokenDao from "./delete-token.dao";
import { validateToken } from "./validateToken.dao";

export const tokenDao = {
  validate: validateToken,
  create: createToken,
  delete: deleteTokenDao,
};
