import fs from "fs";
const path = "./products.json";

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product.createId();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  static createId() {
    if (this.variableId) {
      this.variableId++;
    } else {
      this.variableId = 1;
    }
    return this.variableId;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      if (products.some((element) => element.code === product.code)) {
        console.log(`El código del producto ya existe`);
        return;
      }
      if (
        Object.values(products).includes("") ||
        Object.values(products).includes(null)
      ) {
        console.log("Los campos no pueden estar vacios");
        return;
      }
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
        console.log(error)
    }
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(`Product with ID ${id} not found`);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const element = products.find((element) => element.id === id);
    if (element) {
      return element;
    } else throw new Error(`Product with ID ${id} not found`);
  }

  async updateProduct(id, campo, newValue) {
    const products = await this.getProducts();
    const index = products.findIndex((element) => element.id == id);
    if (index == -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    products[index][campo] = newValue;

    await fs.promises.writeFile(this.path, JSON.stringify(products));
    console.log(`Se actualizó el producto`);
  }

  async deleteProduct(id) {}
}

export { ProductManager, path };