import mongoose from "mongoose";
import { TOKEN_TYPE } from "../enums/token-type.enum";

interface TokenDto {
  sub: mongoose.Schema.Types.ObjectId;
  name: string;
  role: string;
  iat: number;
  exp: number;
  type: TOKEN_TYPE;
}

export default TokenDto;
