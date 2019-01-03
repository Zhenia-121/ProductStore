import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { ShoppingCart } from './../../shared/models/ShoppingCart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product-service.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products: Product[];
  category = ' ';
  queryObject: any = {};
  shoppingCart$: Observable<ShoppingCart>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params  => {
      this.category = params.get('category');
      this.populateProducts(this.category);
    });
    // this.subscription = this.cartService.getShoppingCart().subscribe(cart => {
    //   this.shoppingCart = cart;
    // }, error => console.error(error));
    this.cartService.getShoppingCart().subscribe(result => console.log(result));
    this.shoppingCart$ = this.cartService.cart;
  }
  private populateProducts(category?) {
    if (category == null || category === undefined || category === '') {
      this.queryObject = {};
    } else {
      this.queryObject.category = category;
    }
    this.productService.getProducts(this.queryObject).subscribe(result => {
        this.products = <Product[]> result;
        console.log(this.products);
    });
  }
}
