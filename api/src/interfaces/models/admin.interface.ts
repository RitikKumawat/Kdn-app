export interface IAdminModel extends Document {
  username: string;
  password: string;
  role: "admin" | "super-admin";
}
