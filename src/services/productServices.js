import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js";
const { prodDao } = factory;

export default class ProductServices extends Services {
  constructor() {
    super(prodDao);
  }
}
