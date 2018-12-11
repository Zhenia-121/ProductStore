import { Category } from './../models/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
      this.url = baseUrl + 'api/category';
    }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.url).pipe(
      map((result: Category[]) => {
        return result;
      }), catchError(error => {
      console.error(error);
      return new Observable<Category[]>(null);
    }));
  }
}
