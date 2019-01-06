import { AuthService } from './../auth/services/auth-service.service';
import { ShoppingCart } from './../shared/models/ShoppingCart';
import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(
    private cartService: ShoppingCartService
    ) { }

  ngOnInit() {
    this.cartService.getShoppingCart();
    this.cart$ = this.cartService.cart;
  }
}
