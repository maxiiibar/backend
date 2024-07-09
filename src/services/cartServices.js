import Services from "./classServices.js";
import CartDaoMongoDB from "../daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB();

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async addProductToCart(idCart, idProduct) {
    try {
      const response = await this.dao.checkCartAndProd(idCart, idProduct);
      if (!response) return false;
      const existProductInCart = await this.dao.existProductInCart(
        idCart,
        idProduct
      );
      if (existProductInCart) {
        const quantity =
          existProductInCart.products.find(
            (p) => p.product.toString() === idProduct
          ).quantity + 1;
        return await this.dao.addProductToCart(idCart, idProduct, quantity);
      }
      return await this.dao.addProductToCart(idCart, idProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdFromCart(idCart, idProduct) {
    try {
      const response = await this.dao.checkCartAndProd(idCart, idProduct);
      if (!response) return false;
      return await this.dao.removeProdFromCart(idCart, idProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityFromCart(idCart, idProduct, quantity) {
    try {
      const response = await this.dao.checkCartAndProd(idCart, idProduct);
      if (!response) return false;
      return await this.dao.updateProdQuantityFromCart(
        idCart,
        idProduct,
        quantity
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(idCart) {
    try {
      const cart = await this.dao.clearCart(idCart);
      if (!cart) return false;
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
