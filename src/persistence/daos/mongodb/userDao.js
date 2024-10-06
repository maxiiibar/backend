import MongoDao from "./mongoDao.js";
import { UserModel } from "./models/userModel.js";

export default class UserDaoMongoDB extends MongoDao {
  constructor() {
    super(UserModel);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      return await this.model.findById(id).populate("cart");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsersByState(value) {
    try {
      return await this.model.find({ active: value });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsersSummarized(values) {
    try {
      const projection = values.reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});

      return await this.model.find({}, projection);
    } catch (error) {
      throw new Error(error);
    }
  }
}
