import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'settings',
  component: SettingsComponent
}]);

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    settingsRouting
  ],
  exports: [],
  providers: [],
})
export class SettingsModule {}
