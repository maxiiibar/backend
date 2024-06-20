import * as service from "../services/cartServices.js";

export const addCart = async (req, res, next) => {
  try {
    const cart = await service.addCart();
    if (!cart) res.status(404).json({ msg: "Error creating cart!" });
    else res.status(200).json(cart);
  } catch (error) {
    next(error.message);
  }
};

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await service.getAllCarts();
    if (!carts) res.status(404).json({ msg: "Error getting carts" });
    else res.status(200).json(carts);
  } catch (error) {
    next(error.message);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getCartById(id);
    if (!response) res.status(404).json({ msg: "Cart not found" });
    else res.status(200).json(response);
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
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.deleteCart(id);
    if (!response) res.status(404).json({ msg: "Error removing cart" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.updateCart(id, req.body);
    if (!response) res.status(404).json({ msg: "Error updating cart" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const removeProdFromCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const response = await service.removeProdFromCart(idCart, idProd);
    if (!response)
      res.status(404).json({ msg: "Error removing product from cart" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateProdQuantityFromCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const { quantity } = req.body;
    const response = await service.updateProdQuantityFromCart(idCart, idProd, quantity);
    if (!response)
      res.status(404).json({ msg: "Error updating quantity" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const response = await service.clearCart(idCart);
    if (!response)
      res.status(404).json({ msg: "Error clearing cart" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
}
