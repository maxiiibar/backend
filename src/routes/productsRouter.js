import { Router } from "express";
import * as controller from "../controllers/productControllers.js"

const router = Router();

router.get("/", controller.getProducts);

router.get("/home", async(req, res) => {
  const products = await productManager.getProducts();
  res.render('home', {products})
})

router.get("/:id", controller.getProductById);

router.post("/", controller.addProduct);

router.put("/:id", controller.updateProduct);

router.delete("/:id", controller.deleteProduct);

export default router;