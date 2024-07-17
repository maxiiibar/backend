import { Router } from "express";
import ProductController from "../controllers/productsController.js"
const controller = new ProductController()
import ProductServices from "../services/productServices.js";
const services = new ProductServices();
const router = Router();

router.get("/", controller.getAll);

router.get("/home", async (req, res, next) => {
  try {
    const products = await services.getAll();
    res.render("home", { products });
  } catch (error) {
    next(error.message)
  }
});

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

router.delete("/", controller.deleteAll)

export default router;
