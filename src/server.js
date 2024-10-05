import express from "express";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import morgan from "morgan";
import helmet from 'helmet'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { info } from "./docs/info.js";
const specs = swaggerJSDoc(info);

import { __dirname } from "./utils/utils.js";
import config from "../config.js";
import logger from "./errors/devLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "./passport/passportConfig.js";
import ProductServices from "./services/productServices.js";
const productService = new ProductServices();
import MessageServices from "./services/messageServices.js";
const msgServices = new MessageServices();
import Routes from "./routes/routes.js";
const routes = new Routes();

const app = express();

app
  .use(helmet())
  .use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
  .use(express.static(__dirname + "/../public"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cookieParser())

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../views");

app.use(passport.initialize());

app.use("/api", routes.getRouter());

app.use(errorHandler);

const httpServer = app.listen(config.PORT, () =>
  logger.info(`Server ok en puerto ${config.PORT}`)
);

const socketIoServer = new Server(httpServer);

socketIoServer.on("connection", (socket) => {
  socket.on("newProduct", async (prod) => {
    await productService.create(prod)
    const products = await productService.getAll();
    socketIoServer.emit("products", products);
  });

  socket.on("newUser", (user) => {
    logger.info(`> ${user} ha iniciado sesión`);
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:message", async (msg) => {
    await msgServices.create(msg);
    socketIoServer.emit("messages", await msgServices.getAll());
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

export default app;
