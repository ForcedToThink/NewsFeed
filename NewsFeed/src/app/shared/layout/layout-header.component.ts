import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html'
})
export class LayoutHeaderComponent implements OnInit {
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
