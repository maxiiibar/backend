import * as service from "../services/productServices.js"

export const getProducts = async (req, res, next) => {
    try {
        const response = await service.getProducts();
        res.json(response);
    } catch (error) {
        next(error.message)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getProductById(id)
        if (!response) res.status(404).json({msg: 'Product not found'});
        else res.json(response);
    } catch (error) {
        next(error.message)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const newProduct = await service.addProduct(req.body);
        if(!newProduct) res.status(404).json({msg: 'Error creating product'});
        else res.json(newProduct);
    } catch (error) {
        next(error.message)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.updateProduct(id, req.body);
        if (!response) res.status(404).json({msg: 'Error updating product'});
        else res.json(response)
    } catch (error) {
        next(error.message)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.deleteProduct(id);
        if (!response) res.status(404).json({msg: 'Error removing '});
        else res.json(response)
    } catch (error) {
        next(error.message)
    }
}