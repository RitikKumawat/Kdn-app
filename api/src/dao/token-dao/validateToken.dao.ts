import { JwtPayload, verify } from "jsonwebtoken";
import { models } from "../../models/index.model";
import { ENV } from "../../env/env";

interface IDecode extends JwtPayload {
  id: string;
  name: string;
  iat: number;
  exp: number;
}

export const validateToken = async (token: string) => {
  const decode = verify(token, ENV.JWT_TOKEN ?? "") as IDecode;

  const tokenData = await models.token.findOne({ token });

  if (!tokenData || tokenData.userId.toString() !== decode.id.toString()) {
    return undefined;
  }

  return tokenData;
};
