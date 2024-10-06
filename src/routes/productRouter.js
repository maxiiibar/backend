import { Router } from "express";
import { checkAdmin, checkPremium } from "../middlewares/checkRole.js";
import { checkAuth } from "../middlewares/authJwt.js";
import ProductController from "../controllers/productsController.js";
const controller = new ProductController();
import ProductServices from "../services/productServices.js";
const services = new ProductServices();
const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/home", [checkAuth], controller.renderHome);

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkPremium], controller.create);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkPremium], controller.delete);

router.delete("/", [checkAuth, checkAdmin], controller.deleteAll);

export default router;
