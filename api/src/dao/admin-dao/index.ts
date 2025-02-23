import { findAdminById } from "./findAdminById.dao";
import { findByUsername } from "./findByUsername.dao";

export const adminDao = {
  findById: findAdminById,
  findByUsername: findByUsername,
};
