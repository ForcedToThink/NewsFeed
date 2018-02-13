import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from '../shared/models';
import { UserService, TagsService } from '../shared/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  config: ArticleListConfig = new ArticleListConfig();
  tags: Object;

  private currentType: string;

  constructor(
    private userService: UserService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.userService.isAuthenticated.subscribe(
      (data) => {
        _thisComponent.currentType = data ? 'feed' : 'all';
        _thisComponent.config = {type: _thisComponent.currentType, filters: {}};
      }
    );
    this.tagsService.getTags()
      .subscribe(
        (data) => _thisComponent.tags = data
      );
  }

  public setListType(type: string, tag: string): void {
    const filters = !tag ? {} : { tag: tag };
    this.config = {type: type, filters: filters};
  }
}
