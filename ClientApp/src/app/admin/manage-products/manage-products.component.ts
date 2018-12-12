import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  queryObject: any = {};
  products: Product[];
  constructor(private productService: ProductService) {
    this.queryObject.isAscending = true;
   }

  ngOnInit() {
    // this.productService.getProducts().subscribe((result: Product[]) => {
    //   this.products = result;
    // }, error => console.log(error));
    this.getProducts();
  }
  changeSortField(field: string) {
    if (this.queryObject.sortBy === field) {
      this.queryObject.isAscending = !this.queryObject.isAscending;
    } else {
      this.queryObject.isAscending = true;
    }
    this.queryObject.sortBy = field;
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.queryObject).subscribe((result: Product[]) => {
      this.products = result;
    }, error => console.log(error));
  }


}
