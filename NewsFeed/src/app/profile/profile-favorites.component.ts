import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Article, ArticleListConfig } from '../shared/models';
import { ArticleService } from '../shared/services';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html'
})
export class ProfileFavoritesComponent implements OnInit {
  config: ArticleListConfig = {type: 'favorites', filters: {}};

  constructor (
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const _thisComponent = this;
    this.route.parent.data.subscribe((data: {profile: Profile}) => {
      _thisComponent.config.filters.favorited = data.profile.username;
    });
  }
}
