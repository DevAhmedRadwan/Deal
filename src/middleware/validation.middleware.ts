import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateBodyDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(400).json(
        errors.map((error: ValidationError) => ({
          property: error.property,
          constraints: error.constraints,
        }))
      );
    }
    next();
  };
};
