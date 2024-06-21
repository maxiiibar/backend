import { Router } from "express";
const router = Router();
import * as controller from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";

router.post("/login", passport.authenticate('register'), );
router.post('/register', controller.register)
router.get("/info", isAuth, controller.getSessionInfo);
router.get("/logout", controller.logout);

export default router;