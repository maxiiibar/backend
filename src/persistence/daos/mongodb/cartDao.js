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
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const existProdInCart = await this.existProductInCart(idCart, idProduct);
        if(existProdInCart){
          return await this.model.findOneAndUpdate(
            { _id: idCart, 'products.product': idProduct },
            { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await this.model.findByIdAndUpdate(
            idCart,
            { $push: { products: { product: idProduct } } },
            { new: true }
          )
        }
    } catch (error) {
      throw new Error(error);
    }
  }

  async existProductInCart(idCart, idProduct) {
    try {
      return await this.model.findOne({
        _id: idCart,
        products: { $elemMatch: { product: idProduct } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdFromCart(idCart, idProduct) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: idCart },
        { $pull: { products: { product: idProduct } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityFromCart(idCart, idProduct, quantity) {
    try {
      return await this.model.findOneAndUpdate(
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
      return await this.model.findByIdAndUpdate(
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
      const existCart = await this.model.findById(idCart);
      const existProd = await prodDao.getById(idProduct);
      if (!existCart || !existProd) return null;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
