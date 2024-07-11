import express from "express";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import chatRouter from "./routes/messagesRouter.js";
import userRouter from "./routes/userRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import morgan from "morgan";
import ProductDaoMongoDB from "./daos/mongodb/productDao.js";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./db/database.js";
import MessageServices from "./services/messageServices.js";
const msgServices = new MessageServices();
import passport from "./passport/passportConfig.js"
import "dotenv/config";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/chat", chatRouter);
app.use('/users', userRouter);
app.use('/views', viewsRouter);

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
