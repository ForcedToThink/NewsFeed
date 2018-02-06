import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';
import { User } from '../shared/models';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
}
