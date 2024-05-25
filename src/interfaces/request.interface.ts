import { Document } from "mongoose";
import { PROPERTY_TYPE } from "../enums/property-type.enum";
import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     IRequest:
 *       type: object
 *       required:
 *         - requestType
 *         - area
 *         - price
 *         - city
 *         - district
 *         - description
 *         - refreshedAt
 *       requests:
 *         requestType:
 *           type: string
 *           enum: [VILLA, HOUSE, LAND, APARTMENT]
 *           description: The user name
 *         area:
 *           type: number
 *           description: The user name
 *         price:
 *           type: number
 *           description: The user name
 *         city:
 *           type: string
 *           description: The user name
 *         district:
 *           type: string
 *           description: The user name
 *         description:
 *           type: string
 *           description: The user name
 *         refreshedAt:
 *           type: date
 *           description: The user name
 *       example:
 *         requestType: APARTMENT
 *         area: 150
 *         price: 2500000
 *         city: cairo
 *         district: shoubra
 *         description: new request
 *         refreshedAt:
 */
interface IRequest extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  requestType: PROPERTY_TYPE;
  area: number;
  price: number;
  city: string;
  district: string;
  description: string;
  refreshedAt: Date;
}

export default IRequest;
