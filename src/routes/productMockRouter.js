import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import ProductController from "../controllers/productsController.js";
const controller = new ProductController();

const router = Router();

router.post("/", [checkAuth, checkAdmin], controller.createProductsMock);

export default router;
