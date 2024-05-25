import RequestDto from "../dtos/request.dto";
import Request from "../models/request.model";

export const findAll = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const result = await Request.aggregate([
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
  return Request.findOne({ _id }).exec();
};

export const create = async (requestDto: RequestDto) => {
  return Request.create({ ...requestDto, refreshedAt: Date.now() });
};

export const updateById = async (_id: string, requestDto: RequestDto) => {
  return Request.updateOne({ _id }, requestDto);
};

export const deleteById = async (_id: string) => {
  return Request.deleteOne({ _id });
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
