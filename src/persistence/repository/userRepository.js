import UserDaoMongoDB from '../daos/mongodb/userDao.js';
import UserDTO from '../dtos/userDto.js';
const userDao = new UserDaoMongoDB();

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUserById(id) {
        try {
          const user = await this.dao.getById(id);
          return new UserDTO(user);
        } catch (error) {
          throw new Error(error);
        }
    };
}