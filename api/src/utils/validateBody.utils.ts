import { Request, Response, NextFunction } from "express";
import { ObjectSchema, AnyObject, ValidationError } from "yup";
import { JsonResponse } from "./jsonResponse";

export const validateBody = <T extends AnyObject>(schema: ObjectSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const validationError = error as ValidationError;
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        title: "Validation error",
        message: validationError.errors[0],
      });
    }
  };
};
