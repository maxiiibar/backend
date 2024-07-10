import UserServices from "../services/userServices";
import Controllers from "./classController";
import { createResponse } from "../utils";

const userService = new UserServices();

export default class UserController extends Controllers {
  constructor(){
    super(userService)
  }
}

export const registerResponse = async (req, res, next) => {
  try {
    res.json({
      msg: "Succesfully registered",
      session: req.session,
    });
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: "Autenticación fallida" });
    const { firstName, lastName, email, age, role } = user;
    res.json({
      msg: "Succesfully logged in",
      user: {
        firstName,
        lastName,
        email,
        age,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role } = req.user;
    res.json({
      msg: "Succesfully logged in with GITHUB",
      user: {
        firstName,
        lastName,
        email,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};
