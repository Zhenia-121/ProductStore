import { ShoppingCart } from './ShoppingCart';
import { Contact } from './Contact';
export class OrderFromServer {
  id: number;
  orderTime: Date;
  contact: Contact;
  cart: ShoppingCart;
}
