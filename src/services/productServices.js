import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js";
import { generateProduct } from "../utils/productsUtils.js";
const { prodDao } = factory;

export default class ProductServices extends Services {
  constructor() {
    super(prodDao);
  }

  createProductsMock = async () => {
    try {
      const productsArray = [];
      for (let index = 0; index < 100; index++) {
        const product = generateProduct();
        productsArray.push(product);
      }
      return await this.dao.create(productsArray);
    } catch (error) {
      throw new Error(error);
    }
  };
}
