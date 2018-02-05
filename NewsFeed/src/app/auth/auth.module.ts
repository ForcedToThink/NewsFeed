import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'auth',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    authRouting,
    FormsModule,
    NgbModule
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
