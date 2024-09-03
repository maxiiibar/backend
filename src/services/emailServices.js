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

const createMsgRegister = (firstName) => {
  `<h1>¡Hola ${firstName}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> </h1>`;
}