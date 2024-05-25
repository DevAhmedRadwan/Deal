import { Model } from "mongoose";
import IAd from "./ad.interface";

interface IAdModel extends Model<IAd> {}

export default IAdModel;
