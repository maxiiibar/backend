import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkRole.js";
import passport from "passport";
const router = Router();
import UserController from "../controllers/userController.js";
const controller = new UserController();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  controller.loginResponse
);

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  controller.registerResponse
);

router.get("/current", checkAuth, controller.profile);

router.post("/reset-pass", checkAuth, controller.generateResetPass);

router.put("/new-pass", checkAuth, controller.updatePass);

router.put("/premium/:id", [checkAuth, checkAdmin], controller.reverseRole);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

export default router;
