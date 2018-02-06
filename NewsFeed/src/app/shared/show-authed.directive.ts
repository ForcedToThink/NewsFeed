import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { UserService } from './services';

@Directive({ selector: '[appShowAuthed]'})
export class ShowAuthedDirective implements OnInit {

  condition: boolean;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => this.showTemplate(isAuthenticated));
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  private showTemplate(isAuthenticated: boolean) {
    if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
