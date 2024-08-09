import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js";
const { messageDao } = factory;

export default class MessageServices extends Services {
  constructor() {
    super(messageDao);
  }
}
