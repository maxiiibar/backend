import mongoose from "mongoose";
import config from "../../config.js";
import logger from "../errors/devLogger.js"

export default class ConnectMongoDB {
  static #instance;
  constructor() {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.MONGO_URL)
      .then(() => logger.info("Conectado a MongoDB"))
      .catch((error) => logger.error(error));
  }

  static getInstance() {
    if (this.#instance) {
      logger.info("Ya está conectado a MongoDB!");
      return this.#instance;
    } else {
      this.#instance = new ConnectMongoDB();
      return this.#instance;
    }
  }
}