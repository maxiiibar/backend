import HttpResponse from "../utils/httpResponse";
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error}`) 
    const status = error.status || 500
    return httpResponse.ServerError(res, error.message)
}