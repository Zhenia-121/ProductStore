import { CartItem } from './CartItem';
import { Product } from './Product';
export class ShoppingCart {
  // items - то же самое что и products, но явно создаются элементы типа CartItem
  items: CartItem[] = [];
  constructor (public products: CartItem[], public id: number) {
    products.forEach((cartItem) => {
      this.items.push(new CartItem(cartItem));
    });
  }
  getQuantity(productId: number): number {
    const product = this.items.find(p => p.id === productId);
    return (product) ? product.quantity : 0;
  }
  // addItem(id: number) {
  //   const itemIndex = this.items.findIndex(i => i.id === id);
  //   if (itemIndex === -1) {

  //   }
  //   // this.items.splice(itemIndex, 1);/
  // }
  // removeItem(id: number) {

  // }
  get getTotalPrice() {
    let totalPrice = 0;
    this.items.forEach(cartItem => {
      totalPrice += cartItem.totalPrice;
    });
    return totalPrice;
  }
  get getTotalQuantity() {
    let total = 0;
    this.products.forEach(product => {
        total += product.quantity;
    });
    return total;
  }
}
