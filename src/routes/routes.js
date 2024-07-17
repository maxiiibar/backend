import { Router } from "express";
import CartRouter from "./cartRouter.js";
import ProductRouter from "./productRouter.js";
import MessageRouter from "./messageRouter.js";
import UserRouter from "./userRouter.js";
import ViewsRouter from "./viewsRouter.js";

export default class Routes {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use("/products", ProductRouter);
    this.router.use("/carts", CartRouter);
    this.router.use("/messages", MessageRouter);
    this.router.use("/users", UserRouter);
    this.router.use("/views", ViewsRouter);
  }

  getRouter() {
    return this.router;
  }
}
