import MessageMongoDB from "../daos/mongodb/messageDao.js";
const messageDao = new MessageMongoDB();

export const createMsg = async (msg) => {
  try {
    return await messageDao.createMsg(msg);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllMsg = async () => {
  try {
    return await messageDao.getAllMsg();
  } catch (error) {
    throw new Error(error);
  }
};

export const getMsgById = async (id) => {
  try {
    return await messageDao.getMsgById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMsg = async (id, obj) => {
  try {
    return await messageDao.updateMsg(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMsg = async (id) => {
  try {
    return await messageDao.deleteMsg(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllMsgs = async () => {
  try {
    return await messageDao.deleteAllMsgs();
  } catch (error) {
    throw new Error(error);
  }
};