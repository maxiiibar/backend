import config from "../../config.js";
import { transporter } from "../services/emailServices.js";
import { createResponse } from "../utils/utils.js";

export const sendMail = async(req, res, next) => {
    try {
        const mailOptions = {
            from: config.EMAIL_GMAIL,
            to: req.user.email,
            subject: 'Bienvenido/a',
            text:'Gracias por contratar nuestro servicio'
        }
        const response = transporter.sendMail(mailOptions);
        console.log('email enviado!')
        createResponse(res, 200, response);
    } catch (error) {
        next(error)
    }
}