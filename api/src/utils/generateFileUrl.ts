import { Request } from "express";

export const generateFileUrl =  (req: Request, filePath: string) => {
  const isSecure = process.env.NODE_ENV == "development";
  const requestProtocol = isSecure ? "https" : "http";
  const serverUrl = requestProtocol + "://" + req.get("host");
  const fileUrl = serverUrl + "/" + filePath;
  return fileUrl;
};