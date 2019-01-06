import { Component, OnInit, Input } from '@angular/core';
import { SaveOrder } from './../shared/models/SaveOrder';
import { ShoppingCart } from '../shared/models/ShoppingCart';
import { OrdersService } from '../shared/services/orders.service';
import { AuthService } from '../auth/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  order: SaveOrder = {
    userId: '',
    shoppingCartId: 0,
    contact: {
      name: '',
      city: '',
      street: '',
      homeNumber: 0
    }
  };
  constructor(
    private orderService: OrdersService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  sendOrder() {
    this.order.shoppingCartId = this.cart.id;
    this.order.userId = this.authService.getUserId();
    console.log(JSON.stringify(this.order));
    this.orderService.createOrder(this.order).subscribe(result => {
      console.log('order was succesfully created');
      this.router.navigate(['/order-success']);
    });
  }
}
