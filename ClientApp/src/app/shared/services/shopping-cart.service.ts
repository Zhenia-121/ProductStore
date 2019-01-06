import { ShoppingCart } from './../models/ShoppingCart';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCart = 'ProductStoreCart';
  private url: string;
  public cart: Subject<ShoppingCart> = new BehaviorSubject<ShoppingCart>(null);
  constructor(
    private htppClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.url = baseUrl + 'api/shoppingCart';
  }

  getOrCreateCartId(productId: number = null) {
    let cartId = localStorage.getItem(this.shoppingCart);
    if (cartId) { return cartId; }

    this.createCart(productId).subscribe((result: string) => {
      cartId = result;
      console.log('cartId = ' + cartId);
      localStorage.setItem(this.shoppingCart, cartId);
      return cartId;
    }, error => console.log(error));
  }

  createCart(productId: number) {
    let query;
    if (productId != null) {
      query = this.getQueryString({ productId: productId });
    } else {
      query = '';
    }
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
    const cartId = this.getOrCreateCartId(productId);
    if (cartId != null) {
      const queryObject = {
        action: action,
        productId: productId,
        cartId: cartId
      };
      return this.htppClient.put(this.url + this.getQueryString(queryObject), null)
        .pipe(
          map((shopingCart: ShoppingCart) => {
            this.cart.next(new ShoppingCart(shopingCart.products, shopingCart.id));
            return shopingCart;
          }));
    }
    console.log('failed during cart changing');
    return null;
  }
  getShoppingCart() {
    const cartId = this.getOrCreateCartId();
    if (cartId != null && cartId !== undefined) {
      return this.htppClient.get(this.url + `/${cartId}`)
        .pipe(map((shopingCart: ShoppingCart) => {
          this.cart.next(new ShoppingCart(shopingCart.products, shopingCart.id));
          return new ShoppingCart(shopingCart.products, shopingCart.id);
        }));
    }
    return new Observable<ShoppingCart>(null);
  }

  addProductToCart(productId: number) {
    return this.changeCart(productId, 'add');
  }
  deleteProductFromCart(productId: number) {
    return this.changeCart(productId, 'delete');
  }
  deleteCart() {
    localStorage.removeItem(this.shoppingCart);
  }
  clearCart() {
    return this.changeCart(0, 'clear');
  }

  private getQueryString(queryObject: any): string {
    if (queryObject == null) {
      return '';
    }
    return '?' + Object.keys(queryObject).map(key => encodeURIComponent(key) + '=' + queryObject[key]).join('&');
  }
}
