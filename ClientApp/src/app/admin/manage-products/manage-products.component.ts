import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  pageSizes = [5, 10, 15];
  queryObject: any = {};
  products: Product[];
  filteredProducts: Product[];
  constructor(private productService: ProductService) {
    this.queryObject.isAscending = true;
    // dafault value
    this.queryObject.pageSize = 5;
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
      this.filteredProducts = this.products = result;
    }, error => console.log(error));
  }

  filter(filterValue: string) {
    this.queryObject.title = filterValue;
    this.getProducts();
    console.log(filterValue);
  }
  changePageSize(value) {
    this.queryObject.pageSize = value;
    this.getProducts();
    console.log(value);
  }

  applyPageChanging($event) {
    this.queryObject.page = $event;
    this.getProducts();
    console.log($event);
  }
  fluentFilter(filter: string) {
     (filter)
       ? this.filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
       : this.filteredProducts = this.products;
  }

}
