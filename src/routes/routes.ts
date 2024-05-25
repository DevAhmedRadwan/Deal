import { Router } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import requestRouter from "./request.route";
import adRouter from "./ad.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/request", requestRouter);
routes.use("/ad", adRouter);
routes.use("/admin", adminRouter);

export default routes;
