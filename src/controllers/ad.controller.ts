import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AdDto from "../dtos/ad.dto";
import IUser from "../interfaces/user.interface";
import adService from "../services/ad.service";
import userService from "../services/user.service";

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
    const resultPage = await adService.findAll(page, limit);
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
    const request = await adService.findById(_id);
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
    const newAd = new AdDto(
      requestType,
      area,
      price,
      city,
      district,
      description
    );
    const createdAd = await adService.create(newAd);
    const user: IUser = req.user as IUser;
    await userService.addAd(user._id.toString(), createdAd._id.toString());
    res.status(httpStatus.CREATED).send(createdAd);
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
    const newAd = new AdDto(
      requestType,
      area,
      price,
      city,
      district,
      description
    );
    await adService.updateById(_id, newAd);
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
    await adService.deleteById(_id);
    const user: IUser = req.user as IUser;
    await userService.removeAd(user._id.toString(), _id);
    res.status(httpStatus.OK).send();
  } catch (err) {
    next(err);
  }
};

export const match = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;
    const _id = req.params._id as string;
    const resultPage = await adService.match(_id, page, limit);
    res.status(httpStatus.OK).json(resultPage);
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
  match,
};
