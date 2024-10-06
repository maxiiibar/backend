import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin, checkPremium } from "../middlewares/checkRole.js";
import passport from "passport";
const router = Router();
import UserController from "../controllers/userController.js";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
const controller = new UserController();

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        if (info && info.clearCookie) {
          res.clearCookie("token");
        }
        else if (info.invalidCredentials){
          return httpResponse.Unauthorized(res, info.message)
        }
        else if(info.inactiveAcount){
          return httpResponse.Unauthorized(res, info.message)
        }
        return httpResponse.BadRequest(res, info ? info.message : "Registration failed." );
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  controller.loginResponse
);

router.post(
  "/register",
  (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        if (info && info.clearCookie) {
          res.clearCookie("token");
        }
        return httpResponse.BadRequest(res, info ? info.message : "Registration failed." );
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  controller.registerResponse
);

router.get("/", [checkAuth, checkPremium], controller.getUsers)

router.get("/state", [checkAuth, checkPremium], controller.getUsersByState)

router.get("/current", checkAuth, controller.profile);

router.post("/reset-pass", checkAuth, controller.generateResetPass);

router.put("/new-pass", checkAuth, controller.updatePass);

router.put("/premium/:id", [checkAuth, checkAdmin], controller.reverseRole);

router.post("/logout", checkAuth, controller.logOut);

router.delete("/checkInactive", controller.checkUsersLastConnection)

export default router;
