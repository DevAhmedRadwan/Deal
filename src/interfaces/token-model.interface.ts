import { Model } from "mongoose";
import IToken from "./token.interface";

interface ITokenModel extends Model<IToken> {}

export default ITokenModel;
