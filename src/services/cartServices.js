import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js"
const { cartDao, prodDao } = factory;

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }

  async addProductToCart(idCart, idProduct) {
    try {
      const existCart = await this.dao.getById(idCart);
      if (!existCart) return null;
  
      const existProd = await prodDao.getById(idProduct);
      if (!existProd) return null;

      return await this.dao.addProductToCart(idCart, idProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdFromCart(idCart, idProduct) {
    try {
      const existCart = await this.dao.getById(idCart);
      if(!existCart) return null;
      const existProdInCart = await this.dao.existProdInCart(idCart, idProduct);
      if (!existProdInCart) return null;
      return await this.dao.removeProdFromCart(idCart, idProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityFromCart(idCart, idProduct, quantity) {
    try {
      const existCart = await this.getById(idCart);
      if(!existCart) return null;
  
      const existProdInCart = await this.dao.existProdInCart(idCart, idProduct);
      if (!existProdInCart) return null;
  
      return await this.dao.updateProdQuantityFromCart(idCart, idProduct, quantity);
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
