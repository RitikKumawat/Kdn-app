import { models } from "../../models/index.model";

export const findAdminById = (id: string) => {
  return models.admin.findById(id).exec();
};
