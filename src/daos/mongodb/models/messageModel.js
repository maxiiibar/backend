import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);

export default MessageModel;
