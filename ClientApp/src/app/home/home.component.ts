import { Category } from './../shared/models/Category';
import { ProductService } from './../shared/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/Product';
import { CategoryService } from '../shared/services/category-service.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[];
  categories: Category[];
  queryObject: any = {};
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = <Category[]> result;
      console.log(this.categories);
    });
    this.populateProducts(null);
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
