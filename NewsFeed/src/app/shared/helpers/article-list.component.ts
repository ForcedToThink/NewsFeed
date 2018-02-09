import { Component, Input } from '@angular/core';
import { ArticleListConfig, Article } from '../models';
import { ArticleService } from '../services';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
  articles: Article[] = [];
  loading = true;

  constructor(
    private articleService: ArticleService
  ) {}

  @Input() set config(config: ArticleListConfig) {
    this.articles = [];
    this.loading = true;
    const _thisComponent = this;
    this.articleService.query(config)
      .subscribe(
        (data) => {
          _thisComponent.articles = data.articles;
          _thisComponent.loading = false;
        }
      );
  }
}
