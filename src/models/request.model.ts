import mongoose, { Schema } from "mongoose";
import IRequest from "../interfaces/request.interface";
import { PROPERTY_TYPE } from "../enums/property-type.enum";
import IRequestModel from "../interfaces/request-model.interface";

const requestSchema = new Schema<IRequest>({
  requestType: { type: String, enum: PROPERTY_TYPE, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, trim: true, maxlength: 100, required: true },
  district: { type: String, trim: true, maxlength: 100, required: true },
  description: { type: String, trim: true, maxlength: 300, required: true },
  refreshedAt: { type: Date, required: true, default: Date.now },
});

const Request = mongoose.model<IRequest, IRequestModel>(
  "Request",
  requestSchema
);

export default Request;
