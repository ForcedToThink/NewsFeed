import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Article } from '../shared/models';
import { ArticleService } from '../shared/services';

@Injectable()
export class ArticleResolverService implements Resolve<Article> {
  constructor(
    private articleService: ArticleService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> {
    const slug = route.params['slug'];

    return this.articleService.getBySlug(slug)
      .catch((error) => Observable.throw(error));
  }
}
