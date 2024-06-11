import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB {
  async addCart() {
    try {
      return await CartModel.create({ products: [] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCarts() {
    try {
      return await CartModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const cart = await CartModel.findById(id)
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
