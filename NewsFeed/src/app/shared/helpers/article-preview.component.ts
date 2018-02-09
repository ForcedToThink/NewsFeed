import { Component, Input } from '@angular/core';
import { Article } from '../models';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  @Input() article: Article;
}