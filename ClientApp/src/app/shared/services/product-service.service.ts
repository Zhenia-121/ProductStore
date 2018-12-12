import { Product } from './../models/Product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { SaveProduct } from '../models/SaveProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.url = baseUrl + 'api/product';
   }

  createProduct(newProduct: SaveProduct): Observable<Product> {
    return this.http.post(this.url, newProduct).pipe(
      map(result => {
        console.log('New Product ->' + result);
        return <Product>result;
      }),
      catchError(error => {
        console.log(error);
        return new Observable<Product>(null);
      }));
  }
  updateProduct(updatedProduct: SaveProduct, id: number): Observable<Product> {
    const httpOptions = new HttpHeaders( { 'Content-Type':  'application/json'});
    return this.http.put(this.url + `/${id}`, updatedProduct, { headers: httpOptions } ).pipe(
      map(result => {
        console.log('Updated Product Id->' + result);
        return <Product> result;
      }),
      catchError(error => {
        console.log(error);
        return new Observable<Product>(null);
      }));
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get(this.url + `/${id}`).pipe(
      map(product => {
        console.log('Recieved object' + JSON.stringify(product));
        return <Product> product ;
      }),
      catchError(error => {
        console.log(error);
        return new Observable<Product>(null);
    }));
  }
  getProducts(query: any = null): Observable<Product[]> {
    console.log(this.getQueryString(query));
    return this.http.get(this.url + this.getQueryString(query)).pipe(
      map(products => {
        return <Product[]> products;
    }),
      catchError(error => {
        console.log(error);
        return new Observable<Product[]>(null);
      }));
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url + `/${id}`).pipe(
      map (result => result),
      catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

  private getQueryString(queryObject: any): string {
    if (queryObject == null) {
      return '';
    }
    return '?' + Object.keys(queryObject).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key])).join('&');
  }

}
