import { MessageModel } from "./models/cartModel.js";

export default class MessageMongoDB {
  async createMsg(msg) {
    try {
      const message = await MessageModel.create(msg);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllMsg() {
    try {
      const messages = await MessageModel.find({});
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMsgById(id) {
    try {
      const msg = await MessageModel.findById(id);
      return msg;
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
