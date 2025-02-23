import { models } from "../../models/index.model";

export const findByUsername = (username: string) => {
  return models.admin.findOne({ username: username }).exec();
};
