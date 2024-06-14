import * as service from "../services/userServices.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (service.checkingAdmin(email, password)) {
      const user = await service.register({
        ...req.body,
        role: "admin",
      });
      if (!user) res.status(401).json({ msg: "User already exist!" });
      else res.redirect("/login");
    }
    const user = await service.register(req.body);
    if (!user) res.status(401).json({ msg: "User already exist!" });
    else res.redirect("/login");
  } catch (error) {
    throw new Error(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const user = service.logIn(req.body);
    if (!user) res.status(401).json({ msg: "No estás registrado" });
    else {
      req.session.info = {
        loggedIn: true,
        contador: 1,
        userMail: user.email,
        userName: user.firstName,
        role: user.role,
      };
      res.redirect("/views/profile");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const visit = (req, res, next) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.userName} ha visitado el sitio ${req.session.info.contador} veces.`,
  });
};
