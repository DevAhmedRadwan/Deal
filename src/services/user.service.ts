import httpStatus from "http-status";
import { RegisterAdminDto } from "../dtos/register-admin.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import User from "../models/user.model";
import ApiError from "../utils/api-error";

export const findByPhone = async (phone: string) => {
  return User.findOne({ phone }).exec();
};

export const findById = async (_id: string) => {
  return User.findOne({ _id }).exec();
};

export const create = async (
  registerUserDto: RegisterUserDto | RegisterAdminDto
) => {
  if (await User.isPhoneTaken(registerUserDto.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Phone already taken");
  }
  return User.create(registerUserDto);
};

export const addRequest = async (_id: string, requestId: string) => {
  return await User.updateOne({ _id: _id }, { $push: { requests: requestId } });
};

export const removeRequest = async (_id: string, requestId: string) => {
  return await User.updateOne({ _id: _id }, { $pull: { requests: requestId } });
};

export const addAd = async (_id: string, requestId: string) => {
  return await User.updateOne({ _id: _id }, { $push: { ads: requestId } });
};

export const removeAd = async (_id: string, requestId: string) => {
  return await User.updateOne({ _id: _id }, { $pull: { ads: requestId } });
};

export const stats = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return User.aggregate([
    {
      $project: {
        requestsCount: { $size: "$requests" },
        adsCount: { $size: "$ads" },
      },
    },
    {
      $group: {
        _id: null,
        totalRequestsCount: { $sum: "$requestsCount" },
        totalAdsCount: { $sum: "$adsCount" },
      },
    },
    {
      $lookup: {
        from: "users",
        let: {
          totalRequestsCount: "$totalRequestsCount",
          totalAdsCount: "$totalAdsCount",
        },
        pipeline: [
          {
            $set: {
              requestsCount: { $size: "$requests" },
              totalRequestsCount: "$$totalRequestsCount",
              adsCount: { $size: "$ads" },
              totalAdsCount: "$$totalAdsCount",
            },
          },
          {
            $project: {
              ads: 0,
              requests: 0,
              password: 0,
              __v: 0,
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        as: "data",
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
        total: { $size: "$data" },
        hasNextPage: { $gt: [{ $size: "$data" }, limit - 1] },
        hasPreviousPage: { $gt: ["$data", 1] },
      },
    },
    {
      $set: {
        page: page,
        limit: limit,
      },
    },
  ]);
};

export default {
  findById,
  findByPhone,
  create,
  addRequest,
  removeRequest,
  addAd,
  removeAd,
  stats,
};
