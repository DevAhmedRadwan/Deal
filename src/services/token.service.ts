import jwt from "jsonwebtoken";
import moment from "moment";
import { config } from "../config/env";
import { TOKEN_TYPE } from "../enums/token-type.enum";
import { USER_ROLE } from "../enums/user-role.enum";
import IUser from "../interfaces/user.interface";
import Token from "../models/token.model";

export const generateToken = (
  userId: string,
  name: string,
  role: USER_ROLE,
  expires: moment.Moment,
  type: TOKEN_TYPE,
  secret: string = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    name,
    role,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const generateAuthTokens = async (user: IUser) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    user.name,
    user.role,
    accessTokenExpires,
    TOKEN_TYPE.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );

  const refreshToken = generateToken(
    user.id,
    user.name,
    user.role,
    refreshTokenExpires,
    TOKEN_TYPE.REFRESH
  );

  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TOKEN_TYPE.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export const saveToken = async (
  token: string,
  userId: string,
  expires: moment.Moment,
  type: TOKEN_TYPE
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });
  return tokenDoc;
};

export const verifyToken = async (token: string, type: TOKEN_TYPE) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
  }).exec();
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

export default {
  generateToken,
  generateAuthTokens,
  saveToken,
  verifyToken,
};
