import express from "express";
import { ProductManager, path} from "./ProductManager.js"
/* import { products } from "./products.js"; */

console.log(path)
const app = express();

const productManager = new ProductManager(path)

const products = await productManager.getProducts()
console.log(products);

app.get("/products", (req, res) => {
    const limit = req.query.limit;
    if (limit) res.json(products.slice(0, parseInt(limit)));
    else res.json(products);
});
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const result = products.find((element)=> element.id===id)
    if (!result) res.status(404).json({msg: 'Product not found'})
    else res.json(result)
})


const PORT = 8080;
app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
