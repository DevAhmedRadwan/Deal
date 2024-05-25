import "reflect-metadata";
import app from "./app";
import { connectToDatabase } from "./config/database";
import { config } from "./config/env";

const port = config.PORT;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Docs is running on http://localhost:${port}/swagger`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
