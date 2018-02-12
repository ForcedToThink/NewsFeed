import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ArticleListConfig } from '../models';

@Component({
  selector: 'app-article-list-paging',
  templateUrl: './article-list-paging.component.html'
})
export class ArticleListPagingComponent implements OnInit {
  offset: number;
  limit: number;
  total: number;

  lastPage: number;
  pages: number[] = [];
  isInitializing = true;

  @Input() set pagingConfig(pagingConfig: {config: ArticleListConfig, total: number}) {
    if (pagingConfig) {
      this.offset = pagingConfig.config.filters.offset ? pagingConfig.config.filters.offset : 0;
      this.limit = pagingConfig.config.filters.limit ? pagingConfig.config.filters.limit : 10;
      this.total = pagingConfig.total;

      this.lastPage = Math.ceil(this.total / this.limit) - 1;
      this.pages = [];
      let currentPage = this.offset - 2;
      if (currentPage > this.lastPage - 4) {
        currentPage = this.lastPage - 4;
      }
      while (this.pages.length < 5 && Math.max(...this.pages) < this.lastPage) {
        if (currentPage >= 0) {
          this.pages.push(currentPage);
        }
        currentPage++;
      }
    }
    this.isInitializing = false;
  }
  @Output() offsetChanged: EventEmitter<number> = new EventEmitter();

  ngOnInit() { }

  public changeOffset(newOffset: number) {
    this.offsetChanged.emit(newOffset);
    this.isInitializing = true;
  }

  public canGoFirst() {
    return !this.isInitializing && this.offset !== 0;
  }

  public canGoBack() {
    return !this.isInitializing && this.offset - 1 >= 0;
  }

  public canGoToPage(pageNumber: number) {
    return !this.isInitializing && this.offset !== pageNumber;
  }

  public canGoForward() {
    return !this.isInitializing &&  this.offset + 1 <= this.lastPage;
  }

  public canGoLast() {
    return !this.isInitializing &&  this.offset !== this.lastPage;
  }
}
