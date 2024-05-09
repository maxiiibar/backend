import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import { __dirname } from "../path.js";

const cartManager = new CartManager(`${__dirname}/db/carts.json`);
const router = Router();

router.post("/:idCart/product/:idProd", async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const response = await cartManager.addProductToCart(idCart, idProd);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await cartManager.addCart();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:idCart", async (req, res, next) => {
    try {
        const { idCart } = req.params;
        res.json(await cartManager.getCartById(idCart));
    } catch (error) {
        next(error);
    }
})

export default router