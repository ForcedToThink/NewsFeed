import { Component, Input } from '@angular/core';
import { Article } from '../models';
import { ArticleService, UserService } from '../services';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  isSubmitting = false;
  isAuthenticated = false;
  _article: Article = new Article();

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  @Input() set article(article: Article) {
    this._article = article;
    this.isAuthenticated = !!this.userService.getCurrentUser().id;
  }

  public favorite(): void {
    this.isSubmitting = true;
    const _thisComponent = this;
    this.articleService.setFavorite(this._article.slug, this._article.favorited)
      .subscribe(
        (data) => {
          _thisComponent._article = data;
          _thisComponent.isSubmitting = false;
        },
        (error) => _thisComponent.isSubmitting = false
      );
  }
}
