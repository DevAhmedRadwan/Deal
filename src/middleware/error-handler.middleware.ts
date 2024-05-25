import httpStatus from "http-status";
import { config } from "../config/env";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
