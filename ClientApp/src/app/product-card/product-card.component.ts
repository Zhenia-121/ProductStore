import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/models/Product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(productId: number) {
    this.shoppingCartService.addProductToCart(productId).subscribe(result => console.log(result));
  }

  deleteFromCart(productId: number) {
    this.shoppingCartService.deleteProductFromCart(productId).subscribe(result => console.log(result));
  }
}
