import dotenv from "dotenv";
import Joi from "joi";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("production", "development", "test")
    .required()
    .description("Node environment type"),
  // ! remove default
  PORT: Joi.number().default(3000).description("Server port"),
  MONGODB_URI: Joi.string().uri().required().description("Mongo DB server uri"),
  MONGODB_DATABASE_NAME: Joi.string()
    .required()
    .description("Mongo DB database name"),
  JWT_SECRET: Joi.string().required().description("JWT secret key"),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    .default(30)
    .description("minutes after which access tokens expire"),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    .default(30)
    .description("days after which refresh tokens expire"),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  PORT: envVars.PORT,
  mongoose: {
    uri: envVars.MONGODB_URI,
    dbName: envVars.MONGODB_DATABASE_NAME,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
