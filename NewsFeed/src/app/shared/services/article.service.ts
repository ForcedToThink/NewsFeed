import { Injectable } from '@angular/core';
import { Article } from '../models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  constructor (
    private api: ApiService
  ) {}

  public save(article: Article): Observable<Article> {
    if (article && article.slug) {
      return this.api.put(`/articles/${article.slug}`, { article: article })
        .map((data) => data.article);
    } else {
      return this.api.post('/articles', { article: article })
        .map((data) => data.article);
    }
  }

  public getBySlug(slug: string): Observable<Article> {
    return this.api.get(`/articles/${slug}`)
      .map((data) => data.article);
  }

  public delete(slug: string): Observable<any> {
    return this.api.delete(`/articles/${slug}`)
      .map((data) => data);
  }
}