import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("message", messageSchema);