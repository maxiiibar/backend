import Controller from "./classController.js";
import ProductServices from "../services/productServices.js";
const productServices = new ProductServices();

export default class ProductController extends Controller {
  constructor() {
    super(productServices);
  }
}
