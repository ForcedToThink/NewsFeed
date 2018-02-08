import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ShowAuthedDirective } from './show-authed.directive';
import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  declarations: [
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MarkdownModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ShowAuthedDirective,
    MarkdownModule
  ],
  providers: [],
})
export class SharedModule {}
