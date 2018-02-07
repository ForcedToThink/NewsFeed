import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';

const profileRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'profile/:username',
  component: ProfileComponent,
  resolve: {
    profile: ProfileResolver
  }
}]);

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    profileRouting,
    SharedModule
  ],
  exports: [],
  providers: [
    ProfileResolver
  ],
})
export class ProfileModule {}
