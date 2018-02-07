import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav-authenticated',
  templateUrl: './header-nav-authenticated.component.html'
})
export class HeaderNavAuthenticatedComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public logout(event) {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  public ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
}
