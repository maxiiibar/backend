import mongoose from "mongoose";
import config from "../../config.js";

export default class ConnectMongoDB {
  static #instance;
  constructor() {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.MONGO_URL)
      .then(() => console.log("Conectado a MongoDB"))
      .catch((error) => console.log(error));
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya está conectado a MongoDB!");
      return this.#instance;
    } else {
      this.#instance = new ConnectMongoDB();
      return this.#instance;
    }
  }
}