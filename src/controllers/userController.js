import Controller from "./classController.js";
import UserServices from "../services/userServices.js";
import { createResponse } from "../utils/utils.js";
const userService = new UserServices();

export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  registerResponse = async (req, res, next) => {
    try {
      const token = this.service.generateToken(req.user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.json({
        msg: "Successfully registered",
        user: req.user,
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  loginResponse = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      if (!token) createResponse(res, 401, {msg: 'Failed authentication'})
      res.cookie('token', token, { httpOnly: true, secure: true });
      const user = await this.service.getByEmail(req.body.email)
      const { firstName, lastName, email, age, role } = user;
      res.json({
        msg: 'Successfully logged in',
        user: {
          firstName,
          lastName, 
          email,
          age,
          role
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  profile = async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user);
      /* const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
        first_name, last_name, email, role
      }) */
     } else createResponse(res, 403, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };
}
