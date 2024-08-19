import config from "../../config.js";
import { transporter } from "../services/emailServices.js";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

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
        httpResponse.Ok(res, response);
    } catch (error) {
        next(error)
    }
}