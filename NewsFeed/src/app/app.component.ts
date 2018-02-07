import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './shared/services';
import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    for (const route of this.router.config) {
      if (route.path !== 'auth' && route.path !== '') {
        if (route.canActivate) {
          route.canActivate.push(AuthGuard);
        } else {
          route.canActivate = [AuthGuard];
        }
      }
    }
  }
}
