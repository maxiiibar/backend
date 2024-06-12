import { Router } from "express";
import * as controller from "../controllers/cartsController.js"

const router = Router();

router.get("/", controller.getAllCarts);

router.post("/", controller.addCart);

router.get("/:id", controller.getCartById);

router.put("/:id", controller.updateCart);

router.delete("/:id", controller.deleteCart);

router.post("/:idCart/product/:idProd", controller.addProductToCart);

router.put("/:idCart/product/:idProd", controller.updateProdQuantityFromCart);

router.delete("/:idCart/product/:idProd", controller.removeProdFromCart);

router.delete("/clear/:idCart", controller.clearCart);

export default router