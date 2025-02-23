import { ICustomerModel } from "../../interfaces/models/customer.interface";
import { models } from "../../models/index.model";

export default async (data: Partial<ICustomerModel>) => {
  return await models.customer.create(data);
};
