import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import realTimeProductsRouter from "./routes/realTimeProductsRouter.js";
import chatRouter from "./routes/messagesRouter.js";
import morgan from "morgan";
import ProductDaoFS from "./daos/filesystem/products/productDao.js";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./db/database.js";
import * as service from "./services/messageServices.js"
import "dotenv/config";

const productManager = new ProductDaoFS(
  `${__dirname}/daos/filesystem/products/products.json`
);

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

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/chat", chatRouter);

app.use(errorHandler);

if (process.env.PERSISTENCE == "MONGO") initMongoDB();

const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server ok en puerto ${PORT}`)
);

const socketIoServer = new Server(httpServer);

socketIoServer.on("connection", (socket) => {
  socket.on("newProduct", async (prod) => {
    await productManager.addProduct(prod);
    const products = await productManager.getProducts();
    socketIoServer.emit("products", products);
  });

  socket.on("newUser", (user) => {
    console.log(`> ${user} ha iniciado sesión`);
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:message", async (msg) => {
    await service.createMsg(msg);
    socketIoServer.emit("messages", await service.getAllMsg());
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
