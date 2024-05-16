import { Router } from "express";
import { __dirname } from "../path.js";

const router = Router();

router.use('/', async(req, res) => {
    res.render('home')
})

export default router;