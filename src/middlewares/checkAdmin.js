import { createResponse } from "../utils.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin")
      createResponse(
        res,
        401,
        "Acceso denegado, solo usuarios administradores"
      );
    else next()
  } catch (error) {
    next(error);
  }
};
