import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
import logger from "../errors/devLogger.js";

export const errorHandler = (error, req, res, next) => {
  logger.error(`${error}`);
  return httpResponse.ServerError(res, error.message);
};
