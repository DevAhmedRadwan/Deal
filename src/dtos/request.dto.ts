import { PROPERTY_TYPE } from "../enums/property-type.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     RequestDto:
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
 *       example:
 *         requestType: APARTMENT
 *         area: 150
 *         price: 2500000
 *         city: cairo
 *         district: shoubra
 *         description: new request
 */
class RequestDto {
  requestType: PROPERTY_TYPE;
  area: number;
  price: number;
  city: string;
  district: string;
  description: string;

  constructor(
    requestType: PROPERTY_TYPE,
    area: number,
    price: number,
    city: string,
    district: string,
    description: string
  ) {
    this.requestType = requestType;
    this.area = area;
    this.price = price;
    this.city = city;
    this.district = district;
    this.description = description;
  }
}

export default RequestDto;
