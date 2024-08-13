import Services from "./classServices.js";
import CartServices from "./cartServices.js";
import ProductServices from "./productServices.js";
import factory from "../persistence/daos/factory.js";

const { ticketDao } = factory;
const prodService = new ProductServices();
const cartServices = new CartServices();

export default class TicketService extends Services {
    constructor(){
        super(ticketDao)
    }

    async generateTicket(user){
        
    }
}