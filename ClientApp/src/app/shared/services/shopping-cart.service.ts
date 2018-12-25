import { ShoppingCart } from './../models/ShoppingCart';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart = 'ProductStoreCart';
  url: string;
  constructor(
    private htppClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
    ) {
      this.url = baseUrl + 'api/shoppingCart';
    }

  getOrCreateCart(productId: number) {
    let cartId = localStorage.getItem(this.shoppingCart);
    if (cartId == null) {
      this.createCart(productId).subscribe((result: string) => {
        cartId = result;
        console.log('cartId = ' + cartId);
        localStorage.setItem(this.shoppingCart, cartId);
        return cartId;
      }, error => console.log(error));
    } else {
      return cartId;
    }
  }

  createCart(productId: number) {
    const query = this.getQueryString({ productId: productId });
    console.log(query);
    return this.htppClient.post(this.url + query, {})
      .pipe(
        map((result: string) => {
          console.log('new cart Id ' + result);
          return result;
        }),
        catchError(error => error));
  }

  changeCart(productId: number, action: string) {
    const cartId = this.getOrCreateCart(productId);
    if (cartId != null) {
      const queryObject = {
        action: action,
        productId: productId,
        cartId: cartId
      };
    return this.htppClient.put(this.url + this.getQueryString(queryObject), null)
        .pipe(
          map((shopingCart: ShoppingCart) => {
            return shopingCart;
          }));
    }
    console.log('failed during cart changing');
    return null;
  }

  addProductToCart(productId: number) {
    return this.changeCart(productId, 'add');
  }
  deleteProductFromCart(productId: number) {
    return this.changeCart(productId, 'delete');
  }
  private getQueryString(queryObject: any): string {
    if (queryObject == null) {
      return '';
    }
    return '?' + Object.keys(queryObject).map(key => encodeURIComponent(key) + '=' + queryObject[key]).join('&');
  }
}
