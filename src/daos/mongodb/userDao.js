import { UserModel } from "./models/userModel.js";

export default class UserDaoMongoDB {
  async register(user) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
