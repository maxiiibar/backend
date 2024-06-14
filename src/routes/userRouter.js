import { Router } from "express";
const router = Router();
import * as controller from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

router.post("/login", controller.logIn);
router.post('/register', controller.register)
router.get("/secret-endpoint", validateLogin, controller.visit);
router.post("/logout", controller.logout);

export default router;