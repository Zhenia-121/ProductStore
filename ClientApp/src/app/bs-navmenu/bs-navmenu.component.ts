import { ShoppingCart } from './../shared/models/ShoppingCart';
import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/services/auth-service.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-bs-navmenu',
  templateUrl: './bs-navmenu.component.html',
  styleUrls: ['./bs-navmenu.component.css']
})
export class BsNavmenuComponent implements OnInit {
  userName$: Observable<string>;
  cart$: Observable<ShoppingCart>;
  // cart: ShoppingCart;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService) {
   }
  ngOnInit() {
    this.cart$ = this.cartService.cart;
    this.cartService.getShoppingCart();
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
