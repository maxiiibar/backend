import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkRole.js";
import CartController from "../controllers/cartsController.js"
const controller = new CartController();

const router = Router();

router.get("/", [checkAuth, checkAdmin], controller.getAll);

router.post("/", [checkAuth, checkAdmin], controller.create);

router.get("/:id", [checkAuth], controller.getById);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

router.post("/product/:idProd", [checkAuth], controller.addProductToCart);

router.post("/:idCart/product/:idProd", [checkAuth, checkAdmin], controller.addProductToCartAdmin);

router.put("/product/:idProd", [checkAuth], controller.updateProdQuantityFromCart);

router.delete("/product/:idProd", [checkAuth], controller.removeProdFromCart);

router.delete("/clear/mycart", [checkAuth], controller.clearCart)

router.delete("/clear/:idCart", [checkAuth, checkAdmin], controller.clearCartAdmin);

export default router