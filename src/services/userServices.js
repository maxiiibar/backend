import Services from "./classServices.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword } from "../utils/utils.js";
import factory from "../persistence/daos/factory.js";
import UserRepository from "../persistence/repository/userRepository.js";
const userRepository = new UserRepository();
const { userDao, cartDao } = factory;

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
      const cartUser = await cartDao.create();
      if (
        email === process.env.EMAIL_ADMIN &&
        password === process.env.PASS_ADMIN
      ) {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
          role: "admin",
          cart: cartUser._id,
        });
        return newUser;
      } else {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
          cart: cartUser._id,
        });
        return newUser;
      }
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

  async getUserById(id) {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateResetPass(user) {
    try {
      return this.generateToken(user, "1h");
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePass(pass, user) {
    try {
      const response = isValidPassword(pass, user.password);
      if (response) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error);
    }
  }
}
