import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize;
  // tslint:disable-next-line:no-input-rename
  @Input('total-count') totalCount: number;
  @Output('changePage') changePage: EventEmitter<number> = new EventEmitter();
  currentPage: number;
  pageCount: number;
  pages: any[];

  ngOnChanges() {
    this.currentPage = 1;
    this.pageCount = Math.ceil(this.totalCount / this.pageSize);
    console.log('pageCount-> ' + this.pageCount);
    console.log('totalCount-> ' + this.totalCount);
    this.pages = [];
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i);
    }
  }
  clickPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changePage.emit(this.currentPage);
  }

  next() {
    if (this.currentPage < this.totalCount) {
      this.currentPage ++;
    }
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage --;
    }
  }
}
