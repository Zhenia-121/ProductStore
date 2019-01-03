import { ShoppingCart } from './../shared/models/ShoppingCart';
import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopCart$: Observable<ShoppingCart>;
  cart$: Observable<ShoppingCart>;
  constructor(private cartService: ShoppingCartService) {
   }

  ngOnInit() {
    this.cartService.getShoppingCart().subscribe();
    this.shopCart$ = this.cartService.cart;
  }
  clearCart() {
    this.cartService.clearCart().subscribe(result => {
      console.log(result);
    });
  }
}
