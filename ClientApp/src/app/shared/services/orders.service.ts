import { ShoppingCartService } from './shopping-cart.service';
import { OrderFromServer } from './../models/OrderFromServer';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { SaveOrder } from '../models/SaveOrder';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private apiUrl: string,
    private cartService: ShoppingCartService) {
      this.url = apiUrl + 'api/order';
    }
    createOrder(order: SaveOrder) {
      return this.http.post(this.url, order).pipe(
        map((orderFromServer: OrderFromServer) => {
          console.log(JSON.stringify(orderFromServer));
          this.cartService.clearCart().subscribe();
          this.cartService.deleteCart();
          return orderFromServer;
        }));
    }
    deleteOrder() {}
    getOrderById() {}
    getOrderByUserId() {}
    getAllOrders() {}
}
