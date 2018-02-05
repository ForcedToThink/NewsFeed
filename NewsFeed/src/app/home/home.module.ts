import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    homeRouting,
    NgbModule
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
