import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
import logger from "../errors/devLogger.js";

export const errorHandler = (error, req, res, next) => {
  logger.error(`${error}`);
  if (error.cause) httpResponse.BadRequest(res, error.message);
  return httpResponse.ServerError(res, error.message);
};
