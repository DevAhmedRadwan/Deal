import mongoose from "mongoose";
import { config } from "./env";

export const connectToDatabase = async () => {
  await mongoose.connect(config.mongoose.uri, {
    dbName: config.mongoose.dbName,
  });
  console.log(`Connected to MongoDB`);
};

export const getDb = () => {
  return mongoose.connection.db;
};
