import { Model } from "mongoose";
import IRequest from "./request.interface";

interface IRequestModel extends Model<IRequest> {}

export default IRequestModel;
