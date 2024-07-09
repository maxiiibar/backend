import MongoDao from "./mongoDao.js";
import { UserModel } from "./models/userModel.js";

export default class UserDaoMongoDB extends MongoDao {
  constructor() {
    super(UserModel);
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
