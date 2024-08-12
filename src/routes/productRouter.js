import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { checkAuth } from "../middlewares/authJwt.js";
import ProductController from "../controllers/productsController.js";
const controller = new ProductController();
import ProductServices from "../services/productServices.js";
const services = new ProductServices();
const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/home", [checkAuth], async (req, res, next) => {
  try {
    const products = await services.getAll();
    res.render("home", { products });
  } catch (error) {
    next(error.message);
  }
});

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkAdmin], controller.create);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

router.delete("/", [checkAuth, checkAdmin], controller.deleteAll);

export default router;
