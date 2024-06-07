import { CartModel } from "./models/cartModel.js";
import ProductDaoMongoDB from "./productDao.js";

export default class CartDaoMongoDB {
  async addCart() {
    try {
      const cart = await CartModel.create({ products: [] });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      const productDao = new ProductDaoMongoDB();
      const product = await productDao.getProductById(idProduct);
      if (!product) throw new Error("Product doesn't exist");
      const cart = await CartModel.findById(idCart);
      if (!cart) throw new Error("Cart doesn't exist");
      const productIndex = cart.products.findIndex(
        (p) => p._id.toString() === idProduct
      );
      if (productIndex !== -1) cart.products[productIndex].quantity += 1;
      else cart.products.push({ _id: idProduct, quantity: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
