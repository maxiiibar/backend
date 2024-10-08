import logger from "../errors/devLogger.js";
import { sendMail } from "../services/emailServices.js";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export const sendMailRegister = async (req, res, next) => {
  try {
    const response = await sendMail(req.user, "register");
    logger.info("email enviado!");
    httpResponse.Ok(res, response);
  } catch (error) {
    next(error);
  }
};
