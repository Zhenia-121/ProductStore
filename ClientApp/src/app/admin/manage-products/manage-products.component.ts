import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((result: Product[]) => {
      this.products = result;
    }, error => console.log(error));
  }

}
