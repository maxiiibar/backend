import mongoose from "mongoose";

export const productsCollectionName = "product";

const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = mongoose.model(
  productsCollectionName,
  ProductsSchema
);
