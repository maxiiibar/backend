import { Router } from "express";
import * as controller from "../controllers/productsController.js";
import { getProducts } from "../services/productServices.js";

const router = Router();

router.get("/", controller.getProducts);

router.get("/home", async (req, res, next) => {
  try {
    const products = await getProducts();
    res.render("home", { products });
  } catch (error) {
    next(error.message)
  }
});

router.get("/:id", controller.getProductById);

router.post("/", controller.addProduct);

router.put("/:id", controller.updateProduct);

router.delete("/:id", controller.deleteProduct);

export default router;
