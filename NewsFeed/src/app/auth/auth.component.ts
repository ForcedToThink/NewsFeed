import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared';
import { Router } from '@angular/router';
import { User, Errors } from '../shared';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService]
})
export class AuthComponent {
  formGroup: FormGroup;
  errors: Errors = new Errors();
  isSubmitting = false;
  private submitType = 'login';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.initFormGroups();
  }

  public submitForm() {
    this.errors = new Errors();
    this.setFormsDisabled(true);

    const credentials = this.formGroup.value;

    this.userService.authenticate(this.submitType, credentials)
      .subscribe(
        (data) => this.router.navigateByUrl('/'),
        (error) => {
          this.errors = error;
          this.setFormsDisabled(false);
        }
      );
  }

  public beforeTabChange($event: NgbTabChangeEvent) {
    const tabId = $event.nextId;
    this.errors = new Errors();
    this.initFormGroups(tabId);
    this.submitType = tabId === 'signInTab' ? 'login' : 'register';
  }

  private initFormGroups(tabId: string = '') {
    this.formGroup = this.formBuilder.group({
      'email': '',
      'password': ''
    });

    if (tabId === 'signUpTab') {
      this.formGroup.addControl('username', new FormControl(''));
    }
  }

  private setFormsDisabled(disabled: boolean) {
    this.isSubmitting = disabled;
    Object.keys(this.formGroup.controls).forEach(key => {
      const ctrl = this.formGroup.get(key);
      disabled ? ctrl.disable() : ctrl.enable();
    });
  }
}
