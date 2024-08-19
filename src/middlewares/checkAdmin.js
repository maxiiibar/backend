import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export const checkAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") httpResponse.Unauthorized(res, {role})
    else next()
  } catch (error) {
    next(error);
  }
};
