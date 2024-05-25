import httpStatus from "http-status";
import { TOKEN_TYPE } from "../enums/token-type.enum";
import Token from "../models/token.model";
import ApiError from "../utils/api-error";
import tokenService from "./token.service";
import userService from "./user.service";

export const login = async (phone: string, password: string) => {
  const user = await userService.findByPhone(phone);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: TOKEN_TYPE.REFRESH,
  }).exec();
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.deleteOne();
};

export const refreshTokens = async (refreshToken: any) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      TOKEN_TYPE.REFRESH
    );
    const user = await userService.findById(refreshTokenDoc.user.toString());
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  login,
  logout,
  refreshTokens,
};
