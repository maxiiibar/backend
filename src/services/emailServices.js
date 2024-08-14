import { createTransport } from 'nodemailer';
import config from "../../config.js";

export const transporter = createTransport({
  service: "gmail",
  port: config.PORT_GMAIL,
  secure: true,
  auth: {
    user: config.EMAIL_GMAIL,
    pass: config.PASS_GMAIL,
  },
});