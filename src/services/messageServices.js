import MessageMongoDB from "../daos/mongodb/messageDao.js";
import Services from "./classServices.js";
const messageDao = new MessageMongoDB();

export default class MessageServices extends Services {
  constructor(){
    super(messageDao)
  }
}