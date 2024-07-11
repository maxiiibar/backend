import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserServices from "../services/userServices.js";
const userServices = new UserServices();
import "dotenv/config";

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
  const user = await userServices.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, user);
};

passport.use("jwt", new jwtStrategy(strategyConfig, verifyToken));