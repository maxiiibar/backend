import { MessageModel } from "./models/cartModel.js";

export default class MessageMongoDB {
  async createMsg(msg) {
    try {
      const message = await MessageModel.create(msg);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllMsg() {
    try {
      const messages = await MessageModel.find({});
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMsgById(id) {
    try {
      const msg = await MessageModel.findById(id);
      if (!msg) throw new Error("Message not found");
      return msg;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMsg(id, obj) {
    try {
      const msg = await this.getMsgById(id);
      const msgUpdated = await MessageModel.findByIdAndUpdate(id, obj, { new: true });
      if (!msgUpdated) throw new Error("Error updating message");
      return msgUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMsg(id) {
    try {
      const deletedMsg = await MessageModel.findByIdAndDelete(id);
      if (!deletedMsg) throw new Error("Msg not found")
      return deletedMsg;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAllMsgs() {
    try {
      const response = await MessageModel.collection.drop();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
