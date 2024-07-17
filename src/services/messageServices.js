import Services from "./classServices.js";
import persistence from "../daos/persistence.js";
const { messageDao } = persistence;

export default class MessageServices extends Services {
  constructor() {
    super(messageDao);
  }
}
