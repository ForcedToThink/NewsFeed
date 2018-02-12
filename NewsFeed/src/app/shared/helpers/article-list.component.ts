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
  totalItemCount: number;
  pagingConfig: {config: ArticleListConfig, total: number} = null;
  private _config: ArticleListConfig;

  constructor(
    private articleService: ArticleService
  ) {}

  @Input() set config(config: ArticleListConfig) {
    this.articles = [];
    this.loading = true;
    this._config = config;
    this.loadArticles();
  }

  public setNewOffset(event) {
    this._config.filters.offset = event;
    this.loadArticles();
  }

  private loadArticles(): void {
    const _thisComponent = this;
    this.articleService.query(_thisComponent._config)
      .subscribe(
        (data) => {
          _thisComponent.articles = data.articles;
          _thisComponent.loading = false;
          _thisComponent.pagingConfig = {config: _thisComponent._config, total: data.articlesCount};
        }
      );
  }
}
