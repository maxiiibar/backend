import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import passport from "passport";
const router = Router();
import UserController from "../controllers/userController.js";
const userController = new UserController();

router.post(
  "/login",
  passport.authenticate("login"),
  userController.loginResponse
);
router.post(
  "/register",
  passport.authenticate("register"),
  userController.registerResponse
);
router.get("/profile", checkAuth, userController.profile);
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Elimina la cookie 'token'
  res.json({ msg: "Logged out successfully" });
});

export default router;
