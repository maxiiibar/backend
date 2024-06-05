// import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongoDB();

import {__dirname} from '../path.js';
import ProductDaoFS from '../dao/filesystem/productDao.js';
const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);