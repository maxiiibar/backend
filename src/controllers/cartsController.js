import Controller from "./classController.js";
import CartServices from "../services/cartServices.js";
import { createResponse } from "../utils/utils.js";
const cartServices = new CartServices();

export default class CartController extends Controller {
  constructor() {
    super(cartServices);
  }

  addProductToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      const response = await this.service.addProductToCart(cart, idProd);
      if (!response) createResponse(res, 404, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  removeProdFromCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const response = await this.service.removeProdFromCart(idCart, idProd);
      if (!response) createResponse(res, 400, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityFromCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      let response
      if(quantity == 0) {
        response = await this.service.removeProdFromCart(idCart, idProd)
      }
      else {
        response = await this.service.updateProdQuantityFromCart(
        idCart,
        idProd,
        quantity
      );
    }
      if (!response) createResponse(res, 400, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const response = await this.service.clearCart(idCart);
      if (!response) createResponse(res, 400, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };
}
