import { ShoppingCart } from './../shared/models/ShoppingCart';
import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  constructor() { }

  ngOnInit() {
  }

}
