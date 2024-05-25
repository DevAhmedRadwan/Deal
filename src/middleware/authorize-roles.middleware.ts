import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import httpStatus from "http-status";
import { USER_ROLE } from "../enums/user-role.enum";

function authorizeRoles(...roles: USER_ROLE[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.user as IUser;
    if (user && !roles.includes(user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({ message: "Forbidden" });
    }
    next();
  };
}

export default authorizeRoles;
