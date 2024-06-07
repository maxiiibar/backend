import mongoose from "mongoose";

export const cartsCollectionName = "carts";

const ProductInCartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const CartsSchema = new mongoose.Schema({
  products: { type: [ProductInCartSchema], required: true, default: [] }
});

export const CartModel = mongoose.model(cartsCollectionName, CartsSchema);
