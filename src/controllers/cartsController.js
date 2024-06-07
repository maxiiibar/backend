import * as service from "../services/cartService.js";

export const addCart = async (req, res, next) => {
  try {
    const response = await service.addCart();
    res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await service.getAllCarts();
    res.json(carts);
  } catch (error) {
    next(error.message);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getCartById(id);
    if (!response) res.status(404).json({ msg: "Cart not found" });
    else res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const response = await service.addProductToCart(idCart, idProd);
    if (!response) res.status(404).json({ msg: "Error adding product" });
    else res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.deleteCart(id);
    if (!response) res.status(404).json({ msg: "Error removing cart" });
    else res.json(response);
  } catch (error) {
    next(error.message);
  }
};
