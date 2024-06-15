import { Router } from "express";
import { validateLogin } from "../middlewares/validateLogin.js";
import { visit } from "../controllers/userController.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// router.get("/profile", (req, res) => {
//     console.log(req.session)
//   res.render("profile");
// });

router.get("/realTimeProducts", async (req, res) => {
  visit(req, res)
  res.render("realTimeProducts");
});

export default router;
