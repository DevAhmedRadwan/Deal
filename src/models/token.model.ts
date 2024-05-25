import mongoose, { Schema } from "mongoose";
import { TOKEN_TYPE } from "../enums/token-type.enum";
import ITokenModel from "../interfaces/token-model.interface";
import IToken from "../interfaces/token.interface";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: TOKEN_TYPE,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model<IToken, ITokenModel>("Token", tokenSchema);

export default Token;
