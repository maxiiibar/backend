import ProductDaoMongoDB from "../daos/mongodb/productDao.js";
const prodDao = new ProductDaoMongoDB();

// import {__dirname} from '../path.js';
// import ProductDaoFS from '../daoS/filesystem/products/productDao.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products/products.json`);

export const addProduct = async (obj) => {
    try {
        return await prodDao.addProduct(obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const getProducts = async () => {
    try {
        return await prodDao.getProducts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (id) => {
    try {
        return await prodDao.getProductById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        return await prodDao.updateProduct(id, obj);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        return await prodDao.deleteProduct(id);
    } catch (error) {
        throw new Error(error);
    }
}