import { Model } from "mongoose";
import IUser from "./user.interface";

interface IUserModel extends Model<IUser> {
  isPhoneTaken(phone: string): boolean;
}

export default IUserModel;
