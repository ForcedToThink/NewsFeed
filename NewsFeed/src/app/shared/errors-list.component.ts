import { Component, Input } from '@angular/core';
import { Errors } from '../shared/models';

@Component({
  selector: 'app-errors',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.css']
})
export class ErrorsListComponent {

  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];

    if (errorList.errors) {
      for (const error in errorList.errors) {
        if (!errorList.errors[error]) {
          continue;
        }
        this.formattedErrors.push(`${error} ${errorList.errors[error]}`);
      }
    }
  }

  get errorList() {
    return this.formattedErrors;
  }
}
