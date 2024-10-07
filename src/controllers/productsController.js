import Controller from "./classController.js";
import ProductServices from "../services/productServices.js";
const productServices = new ProductServices();
import UserServices from "../services/userServices.js";
const userServices = new UserServices();
import { sendMail } from "../services/emailServices.js";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class ProductController extends Controller {
  constructor() {
    super(productServices);
  }

  createProductsMock = async (req, res, next) => {
    try {
      let owner = "";
      req.user.role === "admin" ? (owner = "admin") : (owner = req.user.email);
      httpResponse.Ok(
        res,
        await this.service.createProductsMock(owner)
      );
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
      const product = await this.service.delete(id, role, email);
      if (!product)
        return httpResponse.NotFound(res, "Product not found");
      if (product === -1)
        return httpResponse.Unauthorized(res, "You are not the product owner.");
      const user = await userServices.getByEmail(product.owner);
      if (user.role == "premium") {
        sendMail(user, "product deleted", null, product.name);
      }
      return httpResponse.Ok(res, product);
    } catch (error) {
      next(error);
    }
  };

  renderHome = async (req, res, next) => {
    try {
      const products = await services.getAll();
      const productsMapped = products.map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      }));

      res.render("home", { products: productsMapped });
    } catch (error) {
      next(error.message);
    }
  };
}
