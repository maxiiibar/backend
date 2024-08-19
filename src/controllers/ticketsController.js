import Controller from "./classController.js";
import TicketServices from "../services/ticketServices.js";
const ticketServices = new TicketServices();
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class TicketController extends Controller {
  constructor() {
    super(ticketServices);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await ticketServices.generateTicket(user);
      if (!ticket) httpResponse.NotFound(res, ticket);
      else httpResponse.Ok(res, ticket);;
    } catch (error) {
      next(error);
    }
  }
}
