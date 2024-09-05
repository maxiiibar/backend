import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import passport from "passport";
const router = Router();
import UserController from "../controllers/userController.js";
const controller = new UserController();

router.get("/login", passport.authenticate("login", { session: false }), controller.loginResponse);

router.get("/register", passport.authenticate("register", { session: false }), controller.registerResponse);

router.get("/current", checkAuth, controller.profile);

router.post('/reset-pass', checkAuth, controller.generateResetPass);

router.put('/new-pass', checkAuth, controller.updatePass);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

export default router;
