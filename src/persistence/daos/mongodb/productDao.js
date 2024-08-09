import MongoDao from "./mongoDao.js";
import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB extends MongoDao{
  constructor(){
    super(ProductModel)
  }
}