import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { sendMailRegiser } from "../controllers/emailController.js";

const router = Router();

router.post('/send',[checkAuth], sendMailRegiser)

export default router
