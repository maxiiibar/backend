import CartDaoMongoDB from "../daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB();

// import {__dirname} from '../path.js';
// import CartDaoFS from '../daos/filesystem/carts/cartDao.js';
// const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/cart/carts.json`);

export const addCart = async () => {
    try {
        return await cartDao.addCart();
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
}

export const getCartById = async (id) => {
    try {
        return cartDao.getCartById(id);
    } catch (error) {
        throw new Error(error)
    }
}

export const addProductToCart = async (idCart, idProduct) => {
    try {
        return await cartDao.addProductToCart(idCart, idProduct);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (id) => {
    try {
        return await cartDao.deleteCart(id);
    } catch (error) {
        throw new Error(error);
    }
}