import mongoose from "mongoose";
import AdDto from "../dtos/ad.dto";
import Ad from "../models/ad.model";

export const findAll = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const result = await Ad.aggregate([
    {
      $facet: {
        items: [{ $skip: offset }, { $limit: limit }],
        total: [{ $count: "total" }],
      },
    },
    {
      $project: {
        items: 1,
        total: { $arrayElemAt: ["$total.total", 0] },
        hasNextPage: { $gt: [{ $size: "$items" }, limit - 1] },
        hasPreviousPage: { $gt: ["$page", 1] },
      },
    },
    {
      $set: {
        page: page,
        limit: limit,
      },
    },
  ]).exec();

  return result[0];
};

export const findById = async (_id: string) => {
  return Ad.findOne({ _id }).exec();
};

export const create = async (adDto: AdDto) => {
  return Ad.create(adDto);
};

export const updateById = async (_id: string, adDto: AdDto) => {
  return Ad.updateOne({ _id }, adDto);
};

export const deleteById = async (_id: string) => {
  return Ad.deleteOne({ _id });
};

export const match = async (_id: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const priceTolerance = 0.1; // 10% tolerance

  const result = await Ad.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "requests",
        let: { adPrice: "$price", adDistrict: "$district", adArea: "$area" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gte: [
                      "$price",
                      { $multiply: ["$$adPrice", 1 - priceTolerance] },
                    ],
                  },
                  {
                    $lte: [
                      "$price",
                      { $multiply: ["$$adPrice", 1 + priceTolerance] },
                    ],
                  },
                  { $eq: ["$district", "$$adDistrict"] },
                  { $eq: ["$area", "$$adArea"] },
                ],
              },
            },
          },
          {
            $sort: { refreshedAt: -1 },
          },
          {
            $skip: offset,
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
  ]).exec();

  return result;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  match,
};
