import { Product } from './Product';
export class CartItem {
  constructor (public product: CartItem) {
    Object.assign(this, product);
  }
  id: number;
  price: number;
  title: string;
  url: string;
  quantity: number;

  get totalPrice() {
    return this.quantity * this.price;
  }
}
