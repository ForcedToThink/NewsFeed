import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from '../article/article.component';
import { ArticleResolverService } from '../article/article-resolver.service';
import { SharedModule } from '../shared';
import { MarkdownModule } from 'angular2-markdown';

const articleRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'article/:slug',
  component: ArticleComponent,
  resolve: {
    article: ArticleResolverService
  }
}]);

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    articleRouting,
    MarkdownModule
  ],
  exports: [],
  providers: [
    ArticleResolverService
  ],
})
export class ArticleModule {}
