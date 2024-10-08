import Controller from "./classController.js";
import CartServices from "../services/cartServices.js";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
const cartServices = new CartServices();

export default class CartController extends Controller {
  constructor() {
    super(cartServices);
  }

  getById = async (req, res, next) => {
    try {
      let { id } = req.params;
      if (id === "own") id = req.user.cart;
      const response = await this.service.getById(id);
      if (!response) httpResponse.NotFound(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  addProductToCart = async (req, res, next) => {
    try {
      const { cart, role, email } = req.user;
      const { idProd } = req.params;
      const response = await this.service.addProductToCart(
        cart,
        idProd,
        role,
        email
      );
      if (!response) return httpResponse.NotFound(res, response);
      else if (response === -1)
        return httpResponse.Unauthorized(
          res,
          "You can't add your own products."
        );
      else return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  addProductToCartAdmin = async (req, res, next) => {
    try {
      const { role, email } = req.user;
      const { idProd, idCart } = req.params;
      const response = await this.service.addProductToCart(
        idCart,
        idProd,
        role,
        email
      );
      if (!response) return httpResponse.NotFound(res, response);
      else if (response === -1)
        return httpResponse.Unauthorized(
          res,
          "You can't add products to the cart of the person who created them."
        );
      else return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  removeProdFromCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      console.log(cart);
      const { idProd } = req.params;
      const response = await this.service.removeProdFromCart(cart, idProd);
      if (!response) return httpResponse.BadRequest(res, response);
      else return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityFromCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      const { quantity } = req.body;
      let response;
      if (quantity == 0) {
        response = await this.service.removeProdFromCart(cart, idProd);
      } else {
        response = await this.service.updateProdQuantityFromCart(
          cart,
          idProd,
          quantity
        );
      }
      if (!response) httpResponse.BadRequest(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const response = await this.service.clearCart(cart);
      if (!response) httpResponse.BadRequest(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
  
  clearCartAdmin = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const response = await this.service.clearCart(idCart);
      if (!response) httpResponse.BadRequest(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
}
