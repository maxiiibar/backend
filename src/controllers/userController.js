import Controller from "./classController.js";
import UserServices from "../services/userServices.js";
const userService = new UserServices();
import HttpResponse from "../utils/httpResponse.js";
import { sendMail } from "../services/emailServices.js";
const httpResponse = new HttpResponse();

export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  registerResponse = async (req, res, next) => {
    try {
      const token = this.service.generateToken(req.user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      const user = req.user
      return httpResponse.Ok(res, { user: user, token: token} )
    } catch (error) {
      next(error);
    }
  };

  loginResponse = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      if (!token) httpResponse.Unauthorized(res, token);
      res.cookie("token", token, { httpOnly: true, secure: true });
      const user = await this.service.getByEmail(req.body.email);
      const { firstName, lastName, email, age, role } = user;
      httpResponse.Ok(res, {
        user: {
          firstName,
          lastName,
          email,
          age,
          role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      if (req.user) {
        const { _id } = req.user;
        const user = await this.service.getUserById(_id);
        httpResponse.Ok(res, user);
      } else httpResponse.Unauthorized(res, user);
    } catch (error) {
      next(error);
    }
  };

  generateResetPass = async (req, res, next) => {
    try {
      const user = req.user;
      const token = await this.service.generateResetPass(user);
      if (token) {
        await sendMail(user, "resetPass", token);
        res.cookie("tokenpass", token);
        httpResponse.Ok(res, 'Email "reset pass" sent ok');
      } else httpResponse.BadRequest(res, 'Error sending email "reset pass"');
    } catch (error) {
      next(error);
    }
  };

  updatePass = async (req, res, next) => {
    try {
      const user = req.user;
      const { password } = req.body;
      const { tokenpass } = req.cookies;
      if (!tokenpass) return httpResponse.Unauthorized(res, token);
      const updPass = await this.service.updatePass(password, user);
      if (!updPass) httpResponse.BadRequest(res, "Can't be the same password");
      res.clearCookie("tokenpass");
      httpResponse.Ok(res, updPass);
    } catch (error) {
      next(error);
    }
  };

  reverseRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.reverseRole(id);
      if (!response) return httpResponse.NotFound(res, { id });
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
}
