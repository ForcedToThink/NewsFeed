import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../shared/models';
import { ArticleService } from '../shared/services';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  formGroup: FormGroup;
  article: Article;
  tagField: FormControl;
  isSubmitting = false;

  constructor (
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.article = new Article();
    this.tagField = new FormControl();
    this.initFormGroup();
  }

  public ngOnInit(): void {

    const _thisComponent = this;
    this.route.data.subscribe((data: { article: Article }) => {
      _thisComponent.article = data.article ? data.article : new Article();
      _thisComponent.formGroup.patchValue(_thisComponent.article);
    });
  }

  public submitForm(): void {
    this.setFormsDisabled(true);

    (<any>Object).assign(this.article, this.formGroup.value);

    this.articleService.save(this.article)
      .subscribe(
        (data) => this.router.navigateByUrl(`/article/${data.slug}`),
        (error) => this.setFormsDisabled(false)
      );
  }

  public addTag(): void {
    const tag = this.tagField.value;
    if (this.article.tagList.every((t) => t !== tag)) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset();
  }

  public removeTag(tag: string): void {
    this.article.tagList = this.article.tagList.filter((t) => t !== tag);
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      'title': '',
      'description': '',
      'body': ''
    });
  }

  private setFormsDisabled(disabled: boolean) {
    this.isSubmitting = disabled;
    disabled ? this.tagField.disable() : this.tagField.enable();
    Object.keys(this.formGroup.controls).forEach(key => {
      const ctrl = this.formGroup.get(key);
      disabled ? ctrl.disable() : ctrl.enable();
    });
  }
}
