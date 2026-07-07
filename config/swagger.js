const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microservicio DevOps",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;