import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import httpStatus from "http-status";
import passport from "passport";
import { config } from "./config/env";
import { jwtStrategy } from "./config/passport";
import { setupSwagger } from "./config/swagger/setupSwagger";
import authLimiter from "./middleware/rate-limiter.middleware";
import routes from "./routes/routes";
import ApiError from "./utils/api-error";
import errorHandler from "./middleware/error-handler.middleware";

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/api/auth", authLimiter);
}

app.use(express.json());
app.use("/api", routes);

setupSwagger(app);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

export default app;
