import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB {
  async addProduct(obj) {
    try {
      const product = await ProductModel.create(obj);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProducts() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}