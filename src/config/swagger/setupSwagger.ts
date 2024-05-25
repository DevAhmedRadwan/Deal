import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerOptions from "./swaggerOptions";

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
