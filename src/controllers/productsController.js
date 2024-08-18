import Controller from "./classController.js";
import ProductServices from "../services/productServices.js";
import { createResponse } from "../utils/utils.js";
const productServices = new ProductServices();

export default class ProductController extends Controller {
  constructor() {
    super(productServices);
  }

  createProductsMock = async (req, res, next) => {
    try {
      createResponse(res, 200, await this.service.createProductsMock());
    } catch (error) {
      next(error);
    }
  }
} 
