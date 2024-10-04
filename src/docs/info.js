export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API for Final Project - Coderhouse",
      version: "1.0.0",
      description: `
      This is the API documentation for the final backend project, developed as part of the Coderhouse Backend Course.
      The API provides endpoints to manage various resources such as users, products, and orders in an e-commerce platform.
      Key features include user authentication, product management, and order processing.
      This documentation outlines the available endpoints, parameters, and responses to assist in understanding and interacting with the system.
    `,
    contact: {
        name: 'Máximo Bär',
        email: 'maximobar2003@gmail.com',
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
