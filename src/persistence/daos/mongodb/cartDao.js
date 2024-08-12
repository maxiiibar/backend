import MongoDao from "./mongoDao.js";
import ProductDaoMongoDB from "./productDao.js";
const prodDao = new ProductDaoMongoDB()
import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async create() {
    try {
      return await this.model.create({ products: [] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const cart = await CartModel.findById(idCart);
      if (!cart) return null;
      const existProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === idProduct
      );
      if (existProductIndex !== -1)
        cart.products[existProductIndex].quantity = quantity;
      else cart.products.push({ product: idProduct, quantity });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async existProductInCart(idCart, idProduct) {
    try {
      return await CartModel.findOne({
        _id: idCart,
        products: { $elemMatch: { product: idProduct } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdFromCart(idCart, idProduct) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: idCart },
        { $pull: { products: { product: idProduct } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateProdQuantityFromCart(idCart, idProduct, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: idCart, "products.product": idProduct },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(idCart) {
    try {
      return await CartModel.findByIdAndUpdate(
        idCart,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkCartAndProd(idCart, idProduct) {
    try {
      const existCart = await CartModel.findById(idCart);
      const existProd = await prodDao.getById(idProduct);
      if (!existCart || !existProd) return null;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
