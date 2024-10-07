import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import UserServices from "../services/userServices.js";
import { isValidEmail } from "../utils/utils.js";
import config from "../../config.js";
const userServices = new UserServices();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const secretKey = config.SECRET_KEY;

const signUp = async (req, email, password, done) => {
  try {
    if (req.cookies.token) {
      try {
        jwt.verify(req.cookies.token, secretKey);
        return done(null, false, { message: "Already logged in." });
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return done(null, false, { message: "Token expired, please log in again.", clearCookie: true });
        } else {
          return done(null, false, { message: "Invalid token." });
        }
      }
    }

    if (!isValidEmail(email)) return done(null, false, { message: "Invalid email format." });
    const user = await userServices.getByEmail(email);
    if (user) return done(null, false, { message: "Email already registered." });
    const newUser = await userServices.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};


const login = async (req, email, password, done) => {
  try {
    if (req.cookies.token) {
      try {
        jwt.verify(req.cookies.token, secretKey);
        return done(null, false, { message: "Already logged in." });
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return done(null, false, { message: "Token expired, please log in again.", clearCookie: true });
        } else {
          return done(null, false, { message: "Invalid token." });
        }
      }
    }
    const userlogin = await userServices.login({ email, password });
    if (!userlogin) return done(null, false, { message: "Invalid credentials.", invalidCredentials: true });
    const user = await userServices.getByEmail(email)
    if (!user.active) return done(null, false, { message: "Inactive account" , inactiveAcount: true});
    return done(null, userlogin);
  } catch (error) {
    return done(error);
  }
};


const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);
