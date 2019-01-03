import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('productId') productId: number;
  @Input('countInCart') countInCart: number;
  @Output() changeCount: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addToCart() {
    this.shoppingCartService.addProductToCart(this.productId).subscribe(result => {
      console.log(result);
      this.countInCart++;
      this.changeCount.emit(1);
    });
  }

  deleteFromCart() {
    this.shoppingCartService.deleteProductFromCart(this.productId).subscribe(result => {
      console.log(result);
      this.countInCart--;
      this.changeCount.emit(-1);
      }
    );
  }
}
