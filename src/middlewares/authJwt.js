import jwt from "jsonwebtoken";
import UserService from "../services/userServices.js";
const userServices = new UserService();
import "dotenv/config";

/**
 * Middleware que verifica el token de jwt es valido a través de las cookies
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ msg: "Unauthorized" });
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userServices.getById(decode.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = decode.exp; 
    const timeUntilExp = tokenExp - now;
    if (timeUntilExp <= 300) {
      const newToken = userServices.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.cookie('token', newToken, { httpOnly: true, secure: true });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
