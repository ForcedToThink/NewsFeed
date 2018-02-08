import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Article } from '../shared/models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ArticleService } from '../shared/services';

@Injectable()
export class EditableEditorResolver implements Resolve<Article> {
  constructor (
    private articleService: ArticleService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> {
    const slug = route.params['slug'];

    return this.articleService.getBySlug(slug)
      .catch((error) => {
        this.router.navigateByUrl('/');
        return Observable.throw(error);
      });
  }

}
