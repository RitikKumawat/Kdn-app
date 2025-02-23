import { ITokenModel } from "../../interfaces/models/token.interface";
import { models } from "../../models/index.model";

export default (userId: ITokenModel["userId"]) => {
  return models.token.findOneAndDelete({ userId }, { sort: { createdAt: -1 } });
};
