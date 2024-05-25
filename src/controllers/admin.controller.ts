import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { RegisterAdminDto } from "../dtos/register-admin.dto";
import userService from "../services/user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, phone, role, password } = req.body;
    const newUser = new RegisterAdminDto(name, phone, password);
    const user = await userService.create(newUser);
    res.status(httpStatus.CREATED).send(user);
  } catch (err) {
    next(err);
  }
};

export const stats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;
    const result = await userService.stats(page, limit);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  stats,
};
