import mongoose from "mongoose";
import config from "../../../../../config.js";

export const productsCollectionName = "products";

const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: String, required: false, default: config.EMAIL_ADMIN },
});

export const ProductModel = mongoose.model(
  productsCollectionName,
  ProductsSchema
);
