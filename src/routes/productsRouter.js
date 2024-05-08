import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../managers/productManager.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();

const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get("/", async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const product = await productManager.getProductById(idProd);
    if (!product) res.status(404).json({ msg: "Product not found" });
    else res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", productValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/:idProd", productValidator, async (req, res) => {
  try {
    const { idProd } = req.params;
    const propUpdated = await productManager.updateProduct(idProd, req.body);
    if (!propUpdated) res.status(404).json({ msg: "Error updating product" });
    res.status(200).json(propUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:idProd", async (req, res) => {
    try {
        const { idProd } = req.params;
        const delProd = await productManager.deleteProduct(idProd);
        if (!delProd) res.status(404).json({msg: "Error deleting product"})
        else res.status(200).json({msg: `Product ${idProd} deleted succesfully`});
    } catch (error) {
        next(error);
    }
})

export default router;