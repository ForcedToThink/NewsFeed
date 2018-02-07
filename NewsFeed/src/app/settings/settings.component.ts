import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';
import { User } from '../shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitting: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      'username': '',
      'email': '',
      'bio': '',
      'image': ''
    });
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.formGroup.patchValue(user);
  }

  public submitForm(user: User) {
    this.setFormsDisabled(true);
    this.userService.update(user).subscribe(
      (data) => this.router.navigateByUrl(`/profile/${data.username}`),
      (error) => this.setFormsDisabled(false)
    );
  }

  private setFormsDisabled(disabled: boolean) {
    this.isSubmitting = disabled;
    Object.keys(this.formGroup.controls).forEach(key => {
      const ctrl = this.formGroup.get(key);
      disabled ? ctrl.disable() : ctrl.enable();
    });
  }
}
