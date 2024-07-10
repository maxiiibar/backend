import { createResponse } from "../utils";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      if (!response) createResponse(res, 404, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      if (!response) createResponse(res, 400, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      if (!response) createResponse(res, 404, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      if (!response) createResponse(req, 404, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  deleteAll = async (req, res, next) => {
    try {
      const response = await this.service.deleteAll();
      if (!response) createResponse(res, 404, response);
      else createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };
}
