import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User, Errors } from '../shared';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  errors: Errors = new Errors();
  isSubmitting = false;
  private submitType = 'login';
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initFormGroups();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => this.setReturnUrl(params));
  }

  public submitForm() {
    this.errors = new Errors();
    this.setFormsDisabled(true);

    const credentials = this.formGroup.value;

    this.userService.authenticate(this.submitType, credentials)
      .subscribe(
        (data) => this.router.navigateByUrl(this.returnUrl),
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

  private setReturnUrl(params: Params): void {
    this.returnUrl = params['returnUrl'] ? params['returnUrl'] : '/';
  }

  private setFormsDisabled(disabled: boolean) {
    this.isSubmitting = disabled;
    Object.keys(this.formGroup.controls).forEach(key => {
      const ctrl = this.formGroup.get(key);
      disabled ? ctrl.disable() : ctrl.enable();
    });
  }
}
