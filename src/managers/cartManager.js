import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "../daos/filesystem/productDao.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const allCarts = await fs.promises.readFile(this.path, "utf-8");
        const allCartsJSON = JSON.parse(allCarts);
        return allCartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const allCarts = await this.getAllCarts();
      allCarts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const allCarts = await this.getAllCarts();
      const cart = allCarts.find((element) => element.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      const productExist = await productManager.getProductById(idProduct);
      if (!productExist) throw new Error("product not exist");
      const cartExist = await this.getCartById(idCart);
      if (!cartExist) throw new Error("cart not exist");
      let allCarts = await this.getAllCarts();
      const productInCart = cartExist.products.find(
        (prod) => prod.id === idProduct
      );
      if (!productInCart) {
        const product = {
          id: idProduct,
          quantity: 1,
        };
        cartExist.products.push(product);
      } else productInCart.quantity++;
      const updatedCarts = allCarts.map((cart) => {
        if (cart.id === idCart) return cartExist
        return cart
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExist;
    } catch (error) {
      throw new Error(error);
    }
  }
}
