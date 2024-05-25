import mongoose, { Schema } from "mongoose";
import { PROPERTY_TYPE } from "../enums/property-type.enum";
import IAdModel from "../interfaces/ad-model.interface";
import IAd from "../interfaces/ad.interface";

const adSchema = new Schema<IAd>({
  requestType: { type: String, enum: PROPERTY_TYPE, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, trim: true, maxlength: 100, required: true },
  district: { type: String, trim: true, maxlength: 100, required: true },
  description: { type: String, trim: true, maxlength: 300, required: true },
  refreshedAt: { type: Date, required: true, default: Date.now },
});

const Ad = mongoose.model<IAd, IAdModel>("Ad", adSchema);

export default Ad;
