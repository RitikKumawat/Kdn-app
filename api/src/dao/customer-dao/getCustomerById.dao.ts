import { models } from "../../models/index.model";

export default async (customerId: string) => {
  return models.customer.findById(customerId).exec();
};
