import { Options } from "swagger-jsdoc";
import { config } from "../env";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express MongoDB TypeScript API",
      version: "1.0.0",
      description:
        "A simple Express API application using TypeScript and MongoDB",
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ["./src/**/*.ts"], // Paths to files with documentation
};

export default swaggerOptions;
