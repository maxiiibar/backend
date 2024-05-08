import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(obj) {
    try {
      const product = {
        id: uuidv4(),
        status: true,
        ...obj,
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((element) => element.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts();
      const productExist = await this.getProductById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...obj };
      const productsUpdated = products.filter((element) => element.id !== id);
      productsUpdated.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated));
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    console.log(id);
    const products = await this.getProducts();
    if (products.length > 0) {
      const productExist = await this.getProductById(id);
      console.log(productExist)
      if (productExist) {
        const productsUpdated = products.filter((element) => element.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated));
        return productExist;
      }
    } else return null;
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("Archivo eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}
