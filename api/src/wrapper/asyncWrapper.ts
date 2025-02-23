import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { JsonResponse } from "../utils/jsonResponse";
import { formatDuplicateError } from "../utils/formatMongooseError.utils";

interface TError {
  message: string;
}

export const asyncWrapper = (
  fn: (req: Request, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response) => {
    try {
      return await fn(req, res);
    } catch (error: any) {
      let isDuplicate = null;
      console.log("Async Wrapper: ", error);

      if (
        error instanceof MongoServerError &&
        error.errorResponse &&
        error.errorResponse.code === 11000
      )
        isDuplicate = formatDuplicateError(error);

      return JsonResponse(res, {
        statusCode: isDuplicate ? 400 : 500,
        status: "error",
        message: isDuplicate ?? (error as TError).message,
        title: "Something went wrong",
      });
    }
  };
};
