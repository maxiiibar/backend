import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class Controller {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      httpResponse.Ok(res, response)
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      if (!response) httpResponse.NotFound(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      if (!response) httpResponse.BadRequest(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      if (!response) httpResponse.NotFound(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      if (!response) httpResponse.NotFound(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  deleteAll = async (req, res, next) => {
    try {
      const response = await this.service.deleteAll();
      if (!response) httpResponse.NotFound(res, response);
      else httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
}
