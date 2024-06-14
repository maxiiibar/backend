import UserDaoMongoDB from "../daos/mongodb/userDao.js";
const userDao = new UserDaoMongoDB();

export const checkingAdmin = (email, password) => {
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") return true;
    return false
};

export const register = async (user) => {
    try {
        return await userDao.register(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const logIn = async (userLogIn) => {
    try {
        return await userDao.logIn(userLogIn);
    } catch (error) {
        throw new Error(error);
    }
};