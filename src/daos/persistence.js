import ProductDaoMongoDB from "./mongodb/productDao.js";
import ProductDaoFS from "./filesystem/products/productDao.js";
import CartDaoMongoDB from "./mongodb/cartDao.js";
import CartDaoFS from "./filesystem/carts/cartDao.js";
import MessageDaoMongoDB from "./mongodb/messageDao.js";
import UserDaoMongoDB from "./mongodb/userDao.js";
import ConnectMongoDB from "../db/database.js";
import config from "../../config.js";
import { __dirname } from "../utils.js";

let userDao = null;
let prodDao = null;
let cartDao = null;
let messageDao = null;

const persistence = config.PERSISTENCE;

switch (persistence) {
  case "fs":
    console.log(persistence);
    prodDao = new ProductDaoFS(
      __dirname + "/daos/filesystem/products/products.json"
    );
    cartDao = new CartDaoFS(__dirname + "/daos/filesystem/carts/carts.json");
    break;
  case "mongo":
    console.log(persistence);
    ConnectMongoDB.getInstance();
    userDao = new UserDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    messageDao = new MessageDaoMongoDB();
    cartDao = new CartDaoMongoDB();
    break;
  default:
    prodDao = new ProductDaoFS(
      __dirname + "/daos/filesystem/products/products.json"
    );
    cartDao = new CartDaoFS(__dirname + "/daos/filesystem/carts/carts.json");
    break;
}


export default { userDao, prodDao, messageDao, cartDao }