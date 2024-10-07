import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js";
import { generateProduct } from "../utils/productsUtils.js";
const { prodDao } = factory;

export default class ProductServices extends Services {
  constructor() {
    super(prodDao);
  }

  createProductsMock = async (owner) => {
    try {
      const productsArray = [];
      for (let index = 0; index < 100; index++) {
        const product = generateProduct(owner);
        productsArray.push(product);
      }
      return await this.dao.create(productsArray);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id, role, email) => {
    try {
      const prod = await this.getById(id);
      if (role !== "admin" && email !== prod.owner) return -1;
      return await this.dao.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
