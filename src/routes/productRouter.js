import { Router } from "express";
import { checkAdmin, checkPremium } from "../middlewares/checkRole.js";
import { checkAuth } from "../middlewares/authJwt.js";
import ProductController from "../controllers/productsController.js";
const controller = new ProductController();
import ProductServices from "../services/productServices.js";
const services = new ProductServices();
const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/home", async (req, res, next) => {
  try {
    const products = await services.getAll();
    const productsMapped = products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    }));

    res.render("home", { products: productsMapped });
  } catch (error) {
    next(error.message);
  }
});

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkPremium], controller.create);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkPremium], controller.delete);

router.delete("/", [checkAuth, checkAdmin], controller.deleteAll);

export default router;
