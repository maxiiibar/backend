import Services from "./classServices.js";
import ProductDaoMongoDB from "../daos/mongodb/productDao.js";
const prodDao = new ProductDaoMongoDB();

// import {__dirname} from '../utils.js';
// import ProductDaoFS from '../daoS/filesystem/products/productDao.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products/products.json`);

export default class ProductServices extends Services {
  constructor() {
    super(prodDao);
  }
}