import { Category } from './../../shared/models/Category';
import { CategoryService } from './../../shared/services/category-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input('category') category;
  categories: Category[];
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = <Category[]> result;
    }, error => console.log(error));
  }

}
