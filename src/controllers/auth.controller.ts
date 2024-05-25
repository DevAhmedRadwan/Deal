import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { LoginDto } from "../dtos/login.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, phone, role, password } = req.body;
    const newUser = new RegisterUserDto(name, phone, role, password);
    const user = await userService.create(newUser);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone, password } = req.body;
    const newLogin = new LoginDto(phone, password);
    const user = await authService.login(newLogin.phone, newLogin.password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({ user, tokens });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tokens = await authService.refreshTokens(req.body.refreshToken);
    res.send(tokens);
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  logout,
  refreshTokens,
};
