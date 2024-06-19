import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
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
import * as msgService from "./services/messageServices.js"
import * as userService from "./controllers/userController.js"
import "dotenv/config";

const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cookieParser());
app.use(session(storeConfig));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
// app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/chat", chatRouter);
app.use('/users', userRouter);
app.use('/views', viewsRouter);

app.use(errorHandler);

if (process.env.PERSISTENCE == "MONGO") initMongoDB();

const prodDao = new ProductDaoMongoDB();

const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server ok en puerto ${PORT}`)
);

const socketIoServer = new Server(httpServer);

socketIoServer.on("connection", (socket) => {
  socket.on("newProduct", async (prod) => {
    await prodDao.addProduct(prod);
    const products = await prodDao.getProducts();
    socketIoServer.emit("products", products);
  });

  socket.on('sessionInitiated', ()=>{
    const data = userService.infoSession();
    socketIoServer.emit('infoSession')
  })

  socket.on("newUser", (user) => {
    console.log(`> ${user} ha iniciado sesión`);
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:message", async (msg) => {
    await msgService.createMsg(msg);
    socketIoServer.emit("messages", await msgService.getAllMsg());
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
