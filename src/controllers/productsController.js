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
} 
