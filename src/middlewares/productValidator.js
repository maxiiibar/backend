export const productValidator = (req, res, next) => {
    if (
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.code === undefined ||
        req.body.price === undefined ||
        req.body.stock === undefined ||
        req.body.category === undefined ||
        req.body.title === null ||
        req.body.description === null ||
        req.body.code === null ||
        req.body.price === null ||
        req.body.stock === null ||
        req.body.category === null ||
        req.body.title === "" ||
        req.body.description === "" ||
        req.body.code === "" ||
        req.body.price === "" ||
        req.body.stock === "" ||
        req.body.category === ""
    ) res.status(404).json({msg: 'Invalid body'});
    else next()
}