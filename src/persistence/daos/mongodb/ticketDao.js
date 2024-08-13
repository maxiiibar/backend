import MongoDao from "./mongoDao.js";
import { TicketModel } from "./models/ticketModel.js";

export default class TicketDaoMongoDB extends MongoDao {
    constructor(){
        super(TicketDaoMongoDB);
    }
}