import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin, checkPremium } from "../middlewares/checkRole.js";
import ProductController from "../controllers/productsController.js";
const controller = new ProductController();

const router = Router();

router.post("/", [checkAuth, checkPremium], controller.createProductsMock);

export default router;
