import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user.service";
import IUser from "../interfaces/user.interface";
import requestService from "../services/request.service";
import RequestDto from "../dtos/request.dto";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;
    const resultPage = await requestService.findAll(page, limit);
    res.status(httpStatus.OK).json(resultPage);
  } catch (err) {
    next(err);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const _id = req.params._id as string;
    const request = await requestService.findById(_id);
    res.status(httpStatus.OK).json(request);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { requestType, area, price, city, district, description } = req.body;
    const newRequest = new RequestDto(
      requestType,
      area,
      price,
      city,
      district,
      description
    );
    const createdRequest = await requestService.create(newRequest);
    const user: IUser = req.user as IUser;
    await userService.addRequest(
      user._id.toString(),
      createdRequest._id.toString()
    );
    res.status(httpStatus.CREATED).send(createdRequest);
  } catch (err) {
    next(err);
  }
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const _id = req.params._id as string;
    const { requestType, area, price, city, district, description } = req.body;
    const newRequest = new RequestDto(
      requestType,
      area,
      price,
      city,
      district,
      description
    );
    await requestService.updateById(_id, newRequest);
    res.status(httpStatus.OK).send();
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const _id = req.params._id as string;
    await requestService.deleteById(_id);
    const user: IUser = req.user as IUser;
    await userService.removeRequest(user._id.toString(), _id);
    res.status(httpStatus.OK).send();
  } catch (err) {
    next(err);
  }
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
