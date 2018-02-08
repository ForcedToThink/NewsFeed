import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../shared/models';
import { ArticleService } from '../shared/services';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.route.data.subscribe((data: {article: Article}) => {
      _thisComponent.article = data.article;
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
}
