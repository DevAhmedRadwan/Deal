import mongoose, { Document } from "mongoose";
import { TOKEN_TYPE } from "../enums/token-type.enum";

interface IToken extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  token: String;
  user: mongoose.Schema.Types.ObjectId;
  type: TOKEN_TYPE;
  expires: Date;
}

export default IToken;
