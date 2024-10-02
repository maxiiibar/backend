import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserServices from "../services/userServices.js";
import { isValidEmail } from "../utils/utils.js";
const userServices = new UserServices();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signUp = async (req, email, password, done) => {
  try {
    if (req.cookies.token) return done(null, false);
    const user = await userServices.getByEmail(email);
    if (user) return done(null, false);
    if(!isValidEmail(email)) return done(null, false);
    const newUser = await userServices.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    if (req.cookies.token) {
      return done(null, false);
    }
    const userlogin = await userServices.login({ email, password });
    return done(null, userlogin);
  } catch (error) {
    return done(error);
  }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);
