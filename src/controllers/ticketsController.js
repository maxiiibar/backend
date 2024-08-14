import Controller from "./classController.js";
import TicketServices from "../services/ticketServices.js";
import { createResponse } from "../utils.js";
const ticketServices = new TicketServices();

export default class TicketController extends Controller {
  constructor() {
    super(ticketServices);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await ticketServices.generateTicket(user);
      if (!ticket) createResponse(res, 404, "Error generating ticket");
      else createResponse(res, 200, ticket);
    } catch (error) {
      next(error);
    }
  }
}
