import Services from "./classServices.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword } from "../utils.js";
import persistence from "../daos/persistence.js";
const { userDao } = persistence;

export default class UserServices extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payLoad = {
      userId: user._id,
    };
    return jwt.sign(payLoad, process.env.SECRET_KEY, { expiresIn: time });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const userExists = await this.dao.getByEmail(email);
      if (userExists) return null;
      if (
        email === process.env.EMAIL_ADMIN &&
        password === process.env.PASS_ADMIN
      ) {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
          role: "admin",
        });
        return newUser;
      }
      const newUser = await this.dao.create({
        ...user,
        password: createHash(password),
      });
      return newUser;
    } catch (error) {}
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExists = await this.dao.getByEmail(email);
      if (!userExists) return null;
      const passwordValidated = isValidPassword(password, userExists.password);

      if (!passwordValidated) return null;
      if (userExists && passwordValidated)
        return this.generateToken(userExists);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.dao.getByEmail(email);
      if (!user) return null;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
