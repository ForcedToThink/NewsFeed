import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from '../shared/models';
import { UserService } from '../shared/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  config: ArticleListConfig = new ArticleListConfig();

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.userService.isAuthenticated.subscribe(
      (data) => {
        _thisComponent.config = data ? {type: 'feed', filters: {}} : {type: 'all', filters: {}};
      }
    );
  }

  public setListType(type: string): void {
    this.config = {type: type, filters: {}};
  }
}
