import * as service from "../services/userServices.js";
import { creatHash, isValidPassword } from "../utils.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (service.checkingAdmin(email, password)) {
      const user = await service.register({
        ...req.body,
        password: creatHash(password),
        role: "admin",
      });
      if (!user) res.status(401).json({ msg: "User already exist!" });
      else res.redirect("/login");
    }
    console.log(req.body);
    const user = await service.register({
      ...req.body,
      password: creatHash(password),
    });
    if (!user) res.status(401).json({ msg: "User already exist!" });
    else res.redirect("/views/login");
  } catch (error) {
    throw new Error(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.logIn(email);
    if (!user) res.status(401).json({ msg: "Autenticación fallida" });
    if (isValidPassword(password, user.password)) {
      req.session.info = {
        loggedIn: true,
        contador: 1,
        userMail: user.email,
        userName: user.firstName,
        role: user.role,
      };
      res.redirect("/views/realTimeProducts");
    } else res.status(401).json({ msg: "Autenticación fallida" });
  } catch (error) {
    throw new Error(error);
  }
};

export const getSessionInfo = (req, res) => {
  res.json({
    userName: req.session.info.userName,
    userMail: req.session.info.userMail,
    role: req.session.info.role,
    contador: req.session.info.contador,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send("session destroy");
};

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
};
