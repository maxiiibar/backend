import Controller from "./classController.js";
import ProductServices from "../services/productServices.js";
const productServices = new ProductServices();
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class ProductController extends Controller {
  constructor() {
    super(productServices);
  }

  createProductsMock = async (req, res, next) => {
    try {
      httpResponse.Ok(res, await this.service.createProductsMock());
    } catch (error) {
      next(error);
    }
  }
  
  create = async(req, res, next) => {
    try {
      const role = req.user.role;
      const obj = req.body;
      let response;
      if(role==="premium") response = await this.service.create({...obj, owner: req.user.email});
      else response = await this.service.create(obj);
      console.log(response);
      if(!response) httpResponse.BadRequest(res, response);
      httpResponse.Ok(res, response);
    } catch (error) {
      next(error)
    }
  }
} 
