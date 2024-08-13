import Services from "./classServices.js";
import CartServices from "./cartServices.js";
import ProductServices from "./productServices.js";
import factory from "../persistence/daos/factory.js";

const { ticketDao } = factory;
const prodServices = new ProductServices();
const cartServices = new CartServices();

export default class TicketServices extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user) {
    try {
      const cart = await cartServices.getById(user.cart);
      if (!cart) return null;

      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          const prodDB = await prodServices.getById(idProd);

          if (prodInCart.quantity <= prodDB.stock) {
            const amount = prodInCart.quantity * prodDB.price;
            amountAcc += amount;
          } else return null;
        }
      }

      const ticket = await this.dao.create({
        code: `${Math.floor(Math.random() * 1000)}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });

      await cartServices.clearCart(user.cart);

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
