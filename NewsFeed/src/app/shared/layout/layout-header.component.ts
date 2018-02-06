import { Component } from '@angular/core';
import { UserService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public logout(event) {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
