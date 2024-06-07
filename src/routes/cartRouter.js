import { Router } from "express";
import * as controller from "../controllers/cartsController.js"

const router = Router();

router.get("/", controller.getAllCarts);

router.get("/:id", controller.getCartById);

router.post("/", controller.addCart);

router.post("/:idCart/product/:idProd", controller.addProductToCart);

router.delete("/:id", controller.deleteCart)

export default router