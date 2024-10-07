import { createTransport } from "nodemailer";
import logger from "../errors/devLogger.js";
import config from "../../config.js";

const transporter = createTransport({
  service: "gmail",
  port: config.PORT_GMAIL,
  secure: true,
  auth: {
    user: config.EMAIL_GMAIL,
    pass: config.PASS_GMAIL,
  },
});

const createMsgRegister = (firstName) => {
  return `<h1>Hola ${firstName}, ¡Bienvenido/a a Coderhouse!</h1>`
};

const createMsgProductDeleted = (firstName, productName) => {
  return `<h1>Hola ${firstName}</h1><br><p>Este correo electrónico es para notificarte que tu producto "${productName}" ha sido eliminado.</p>`
};

const createMsgReset = (firstName) => {
  return `<p>¡Hola ${firstName}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
    para restablecer tu contraseña.
    </p>`;
};

export const sendMail = async (user, service, token = null, productName = null) => {
  try {
    const { firstName, email } = user;

    let msg = "";

    service === "register"
      ? (msg = createMsgRegister(firstName))
      : service === "resetPass"
      ? (msg = createMsgReset(firstName))
      : service === "product deleted"
      ? (msg = createMsgProductDeleted(firstName, productName))
      : (msg = "")

    let subj = "";

    subj =
      service === "register"
        ? "Bienvenido/a"
        : service === "resetPass"
        ? "Restablecimiento de contraseña"
        : service === "product deleted"
        ? "Producto eliminado"
        : ""

    const gmailOptions = {
      from: config.EMAIL_GMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    const responseStringify = JSON.stringify(response, null, 2)
    logger.info(`Email enviado:\n${responseStringify}`);
    if (token) return token;
    return response;
  } catch (error) {
    throw new Error(error);
  }
};