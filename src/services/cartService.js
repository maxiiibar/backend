import CartDaoMongoDB from "../daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB();

// import {__dirname} from '../path.js';
// import CartDaoFS from '../daos/filesystem/carts/cartDao.js';
// const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/cart/carts.json`);

export const addCart = async () => {
  try {
    const newCart = await cartDao.addCart();
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllCarts = async () => {
  try {
    return await cartDao.getAllCarts();
  } catch (error) {
    throw new Error(error);
  }
};

export const getCartById = async (id) => {
  try {
    const cart = cartDao.getCartById(id);
    if (!cart) return false;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductToCart = async (idCart, idProduct) => {
  try {
    const response = await cartDao.checkCartAndProd(idCart, idProduct);
    if (!response) return false;
    const existProductInCart = await cartDao.existProductInCart(
      idCart,
      idProduct
    );
    if (existProductInCart) {
      const quantity =
        existProductInCart.products.find(
          (p) => p.product.toString() === idProduct
        ).quantity + 1;
      return await cartDao.addProductToCart(idCart, idProduct, quantity);
    }
    return await cartDao.addProductToCart(idCart, idProduct);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCart = async (id) => {
  try {
    const cart = await cartDao.deleteCart(id);
    if (!cart) return false;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = cartDao.updateCart(id, obj);
    if (!cart) return false;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeProdFromCart = async (idCart, idProduct) => {
  try {
    const response = await cartDao.checkCartAndProd(idCart, idProduct);
    if (!response) return false;
    return await cartDao.removeProdFromCart(idCart, idProduct);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProdQuantityFromCart = async (
  idCart,
  idProduct,
  quantity
) => {
  try {
    const response = await cartDao.checkCartAndProd(idCart, idProduct);
    if (!response) return false;
    return await cartDao.updateProdQuantityFromCart(idCart, idProduct, quantity);
  } catch (error) {
    throw new Error(error);
  }
};

export const clearCart = async (idCart) => {
  try {
    const cart = await cartDao.clearCart(idCart);
    if (!cart) return false;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};
