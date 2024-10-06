const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const errorsDictionary = {
  OK: "Request was successful.",
  BAD_REQUEST:
    "The request could not be understood or was missing required parameters.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  FORBIDDEN: "Access to this resource is forbidden.",
  INTERNAL_SERVER_ERROR:
    "An internal server error occurred. Please try again later.",
};

export default class HttpResponse {
  Ok(res, data) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: errorsDictionary.OK,
      data,
    });
  }

  BadRequest(res, data) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: errorsDictionary.BAD_REQUEST,
      data,
    });
  }

  Unauthorized(res, data) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: errorsDictionary.UNAUTHORIZED,
      error: data,
    });
  }

  NotFound(res, data) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: errorsDictionary.NOT_FOUND,
      data,
    });
  }

  Forbidden(res, data) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: errorsDictionary.FORBIDDEN,
      error: data,
    });
  }

  ServerError(res, data) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: errorsDictionary.INTERNAL_SERVER_ERROR,
      error: data,
    });
  }
}
