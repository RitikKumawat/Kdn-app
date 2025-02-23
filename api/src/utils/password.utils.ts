import { hashSync, compareSync } from "bcrypt";

export const encodePassword = (e: string) => {
  return hashSync(e, 10);
};

export const comparePassword = (e: string, encrypted: string) => {
  const hashed = hashSync(e, 10);
  return compareSync(e, encrypted);
};
