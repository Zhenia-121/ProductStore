import { Category } from './../../shared/models/Category';
import { CategoryService } from './../../shared/services/category-service.service';
import { Product } from './../../shared/models/Product';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from './../../shared/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveProduct } from './../../shared/models/SaveProduct';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productId: number;
  product: Product;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.product = new Product();
  }

  ngOnInit() {
    // const categories$ = this.categoryService.getCategories();
    // const product$ = this.productService.getProduct(this.productId);

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => console.log(error));

    this.productId = +this.route.snapshot.paramMap.get('id');
    console.log('ProductId->' + this.productId);
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((result: Product) => {
        this.product = result;
      }, error => console.log(error));
    }
  }
  onSubmit(saveProduct: SaveProduct) {
    console.log('product before sending' + JSON.stringify(saveProduct));
    if (this.productId) {
      this.productService.updateProduct(saveProduct, this.productId).subscribe(
        result => {
          console.log('Updated Product' + result);
          this.router.navigate(['/manage-products']);
        }, error => console.error(error)
      );
    } else {
      this.productService.createProduct(saveProduct).subscribe(result => {
        console.log('Created Product' + result);
        this.router.navigate(['/manage-products']);
      });
    }
  }
  delete() {
    if (this.productId) {
      if (!confirm('Are you sure you want to delete product?')) { return; }
        this.productService.deleteProduct(this.productId).subscribe(result => {
          console.log('Deleted Product id' + result);
          this.router.navigate(['/manage-products']);
        });
    }
  }

}
