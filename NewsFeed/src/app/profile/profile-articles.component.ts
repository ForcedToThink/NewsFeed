import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Article, Profile, ArticleListConfig } from '../shared/models';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit {
  articles: Article[] = [];
  config: ArticleListConfig = {type: 'profile', filters: {}};

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.route.parent.data.subscribe((data: {profile: Profile}) => {
      _thisComponent.config.filters.author = data.profile.username;
    });
  }
}
