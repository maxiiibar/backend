import Controllers from "./classController.js";
import CartService from "../services/cartServices.js";
import { createResponse } from "../utils.js";
const cartService = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  addProductToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const response = await this.service.addProductToCart(idCart, idProd);
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
      const response = await this.service.updateProdQuantityFromCart(
        idCart,
        idProd,
        quantity
      );
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
