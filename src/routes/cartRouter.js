import { Router } from "express";
import CartController from "../controllers/cartsController.js"
const controller = new CartController();

const router = Router();

router.get("/", controller.getAll);

router.post("/", controller.create);

router.get("/:id", controller.getById);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/:idCart/product/:idProd", controller.addProductToCart);

router.put("/:idCart/product/:idProd", controller.updateProdQuantityFromCart);

router.delete("/:idCart/product/:idProd", controller.removeProdFromCart);

router.delete("/clear/:idCart", controller.clearCart);

export default router