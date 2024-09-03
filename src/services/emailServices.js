import { createTransport } from "nodemailer";
import logger from "../errors/devLogger.js";
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

const createMsgRegister = (firstName) =>
  `<h1>Hola ${firstName}, ¡Bienvenido/a a Coderhouse!</h1>`;

const createMsgReset = (firstName) => {
  return `<p>¡Hola ${firstName}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
    para restablecer tu contraseña.
    </p>`;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { firstName, email } = user;

    let msg = "";

    service === "register"
      ? (msg = createMsgRegister(firstName))
      : service === "resetPass"
      ? (msg = createMsgReset(firstName))
      : (msg = "");

    let subj = "";

    subj =
      service === "register"
        ? "Bienvenido/a"
        : service === "resetPass"
        ? "Restablecimiento de contraseña"
        : "";

    const gmailOptions = {
      from: config.EMAIL_GMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token) return token;
    logger.info(`Email enviado:\n${response}`);
  } catch (error) {
    throw new Error(error);
  }
};