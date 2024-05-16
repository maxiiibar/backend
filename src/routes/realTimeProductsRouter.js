import { Router } from "express";
import { __dirname } from "../path.js";

const router = Router();

router.get('/', async(req, res) => {
    res.render('realTimeProducts')
})

export default router;