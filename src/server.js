import express from "express";
import cookieParser from 'cookie-parser';
import handlebars from "express-handlebars";
import morgan from "morgan";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./db/database.js";
import passport from "./passport/passportConfig.js"
import ProductDaoMongoDB from "./daos/mongodb/productDao.js";
import MessageServices from "./services/messageServices.js";
const msgServices = new MessageServices();
import Routes from "./routes/routes.js";
const routes = new Routes();
import "dotenv/config";

const app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cookieParser())

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());

app.use("/api", routes.getRouter());

app.use(errorHandler);

if (process.env.PERSISTENCE == "MONGO") initMongoDB();

const prodDao = new ProductDaoMongoDB();

const httpServer = app.listen(process.env.PORT, () =>
  console.log(`Server ok en puerto ${process.env.PORT}`)
);

const socketIoServer = new Server(httpServer);

socketIoServer.on("connection", (socket) => {
  socket.on("newProduct", async (prod) => {
    await prodDao.addProduct(prod);
    const products = await prodDao.getProducts();
    socketIoServer.emit("products", products);
  });

  socket.on("newUser", (user) => {
    console.log(`> ${user} ha iniciado sesión`);
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:message", async (msg) => {
    await msgServices.createMsg(msg);
    socketIoServer.emit("messages", await msgServices.getAllMsg());
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
