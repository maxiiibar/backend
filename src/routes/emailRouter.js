import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { sendMail } from "../controllers/emailController.js";

const router = Router();

router.post('/send',[checkAuth], sendMail)

export default router
