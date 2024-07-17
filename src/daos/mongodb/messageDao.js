import MongoDao from "./mongoDao.js";
import { MessageModel } from "./models/messageModel.js";

export default class MessageDaoMongoDB extends MongoDao{
  constructor(){
    super(MessageModel)
  }
}
