import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { sendMailRegister } from "../controllers/emailController.js";

const router = Router();

router.post('/send',[checkAuth], sendMailRegister)

export default router
