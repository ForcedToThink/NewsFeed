import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../shared/models';
import { UserService } from '../shared/services';
import { ProfileService, ArticleService } from '../shared/services';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  isUser: boolean;
  isSubmitting = false;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      const currentUser = this.userService.getCurrentUser();
      this.isUser = currentUser.username === this.profile.username;
    });
  }

  public getFollowButtonLabel(): string {
    return this.profile.following
      ? `Unfollow ${this.profile.username}`
      : `Follow ${this.profile.username}`;
  }

  public followUser(event) {
    this.isSubmitting = true;
    this.profile.following = !this.profile.following;

    if (this.profile.following) {
      this.profileService.follow(this.profile.username)
        .subscribe(
          (data) => this.profile = data,
          (err) => this.isSubmitting = false,
          () => this.isSubmitting = false
        );
    } else {
      this.profileService.unfollow(this.profile.username)
        .subscribe(
          (data) => this.profile = data,
          (err) => this.isSubmitting = false,
          () => this.isSubmitting = false
        );
    }
  }
}
