import { sign } from "jsonwebtoken";
import { ENV } from "../../env/env";
import { models } from "../../models/index.model";

interface IData {
  id: string;
  username: string;
  role: string;
  expiresIn?: string | number;
}

export const createToken = async (data: IData) => {
  const { id, username, role, expiresIn = 24 * 60 * 60 } = data;

  if (!ENV.JWT_TOKEN) {
    throw new Error("Please setup jwt token in env.");
  }

  const token = sign({ id, username, role }, ENV.JWT_TOKEN, {
    expiresIn: expiresIn,
  });

  return await models.token.create({ token, userId: id });
};
