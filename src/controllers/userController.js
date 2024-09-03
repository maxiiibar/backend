import Controller from "./classController.js";
import UserServices from "../services/userServices.js";
const userService = new UserServices();
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

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
      if (!token) httpResponse.Unauthorized(res, token)
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
      httpResponse.Ok(res, user);
     } else httpResponse.Unauthorized(res, user)
    } catch (error) {
      next(error);
    }
  };

  generateResetPass = async(req, res, next) => {
    try {
      const user = req.user;
      const token = await this.service.generateResetPass(user);
      if(token){
        await sendMail
      }
    } catch (error) {
      
    }
  }
}
