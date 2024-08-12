import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import passport from "passport";
const router = Router();
import UserController from "../controllers/userController.js";
const userController = new UserController();

router.get("/login", passport.authenticate("login", { session: false }), userController.loginResponse);

router.get("/register", passport.authenticate("register", { session: false }), userController.registerResponse);

router.get("/current", checkAuth, userController.profile);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

export default router;
