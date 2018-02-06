import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule, UserService, ApiService } from '../shared';
import { Http } from '@angular/http';
import { ErrorsListComponent } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'auth',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [
    AuthComponent,
    ErrorsListComponent
  ],
  imports: [
    CommonModule,
    authRouting,
    NgbModule,
    SharedModule
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
