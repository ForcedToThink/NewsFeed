import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../shared/models';
import { ArticleService, UserService, ProfileService } from '../shared/services';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  article: Article;
  isAuthor: boolean;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService,
    private profileSerivce: ProfileService
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.route.data.subscribe((data: {article: Article}) => {
      _thisComponent.article = data.article;
      _thisComponent.isAuthor = data.article.author.username === _thisComponent.userService.getCurrentUser().username;
    });
  }

  public editArticle() {
    this.router.navigateByUrl(`/editor/${this.article.slug}`);
  }

  public deleteArticle() {
    this.articleService.delete(this.article.slug)
      .subscribe(
        (data) => this.router.navigateByUrl('/')
      );
  }

  public follow(): void {
    this.isSubmitting = true;

    const _thisComponent = this;
    this.profileSerivce.setFollow(this.article.author.username, this.article.author.following)
      .subscribe(
        (data) => {
          _thisComponent.article.author.following = data.following;
          _thisComponent.isSubmitting = false;
        },
        (error) => _thisComponent.isSubmitting = false
      );
  }

  public favorite(): void {
    this.isSubmitting = false;

    const _thisComponent = this;
    this.articleService.setFavorite(this.article.slug, this.article.favorited)
      .subscribe(
        (data) => {
          _thisComponent.article = data;
          _thisComponent.isSubmitting = false;
        },
        (error) => _thisComponent.isSubmitting = false
      );
  }

  public getButtonLabel(type: string): string {
    if (type === 'follow') {
      return this.article.author.following
        ? `Unfollow ${this.article.author.username}`
        : `Follow ${this.article.author.username}`;
    } else if (type === 'favorite') {
      return this.article.favorited
        ? `Unfavorite Article (${this.article.favoritesCount})`
        : `Favorite Article (${this.article.favoritesCount})`;
    } else {
      return '';
    }
  }
}
