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
  };

  create = async (req, res, next) => {
    try {
      const obj = req.body;
      let response;
      if (req.user.role === "premium")
        response = await this.service.create({ ...obj, owner: req.user.email });
      else response = await this.service.create(obj);
      if (!response) return httpResponse.BadRequest(res, response);
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user.role;
      const email = req.user.email;
      const response = await this.service.delete(id, role, email);
      if (!response)
        return httpResponse.Unauthorized(res, "You are not the product owner.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
}
