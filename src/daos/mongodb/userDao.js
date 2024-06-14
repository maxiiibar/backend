import { UserModel } from "./models/userModel.js";

export default class UserDaoMongoDB {
  async register(user) {
    try {
      const { email } = user;
      const existUser = await UserModel.findOne({ email });
      if (!existUser) return await UserModel.create(user);
      else return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async logIn(userLogIn) {
    try {
        return await UserModel.findOne(userLogIn);
    } catch (error) {
        throw new Error(error);
    }
  }
}
