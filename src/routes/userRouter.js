import { Router } from "express";
const router = Router();
import * as controller from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

router.post("/login", controller.logIn);
router.post('/register', controller.register)
router.get("/info", validateLogin, controller.getSessionInfo);
router.get("/logout", controller.logout);

export default router;