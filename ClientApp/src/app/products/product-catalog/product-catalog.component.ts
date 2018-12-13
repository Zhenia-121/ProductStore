import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product-service.service';

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params  => {
      this.category = params.get('category');
      console.log(this.category);
      this.populateProducts(this.category);
    });
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
