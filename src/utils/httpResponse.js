const HttpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const errorsDictionary = {
  OK: "Request was successful.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED:
    "You are not authorized to access this resource. Please log in.",
  FORBIDDEN: "Access to this resource is forbidden.",
  INTERNAL_SERVER_ERROR:
    "An internal server error occurred. Please try again later.",
};

export class HttpResponse {
  Ok(res, data) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: errorsDictionary.OK,
      data,
    });
  }

  NotFound(res, data) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: errorsDictionary.NOT_FOUND,
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
