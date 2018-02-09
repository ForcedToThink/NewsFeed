import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Article, ArticleListConfig } from '../models';
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

  public filter(searchParams: Object): Observable<Article[]> {
    const params = new URLSearchParams();

    Object.keys(searchParams).forEach((key) => {
      params.append(key, searchParams[key]);
    });

    return this.api.get('/articles', params)
      .map((data) => data.articles);
  }

  public query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    const searchParams = new URLSearchParams();
    Object.keys(config.filters).forEach((key) => {
      searchParams.set(key, config.filters[key]);
    });

    const url = config.type === 'feed' ? '/articles/feed' : '/articles';
    return this.api.get(url, searchParams)
      .map((data) => data);
  }
}
